const main = (config) => {

  config['mixed-port'] = 7890;
  config['ipv6'] = true;
  config['allow-lan'] = true;
  config['unified-delay'] = false;
  config['tcp-concurrent'] = true;
  config['find-process-mode'] = 'strict';
  config['global-client-fingerprint'] = 'firefox';
  config.profile = {
    'store-selected': true,
    'store-fake-ip': true
  };
  
  if (config.proxies) {
  config.proxies = config.proxies.filter(proxy => 
    !proxy.name?.match(/剩余|重置|官网|套餐|订阅|重启|群组|测试|电视/)
  );
  };
  
  config.sniffer = {
    enable: true,
    sniff: {
      HTTP: {
        ports: [80, '8080-8880'],
        'override-destination': true
      },
      TLS: {
        ports: [443, 8443]
      },
      QUIC: {
        ports: [443, 8443]
      }
    },
    'skip-domain': [
      'Mijia Cloud',
      '+.push.apple.com'
    ]
  };
  
  config.tun = {
    enable: true,
    stack: 'mixed',
    'dns-hijack': [
      'any:53',
      'tcp://any:53'
    ],
    'auto-route': true,
    'auto-redirect': true,
    'auto-detect-interface': true
  };
  
  config.dns = {
    enable: true,
    ipv6: true,
    'enhanced-mode': 'fake-ip',
    'fake-ip-filter': [
      '*',
      '+.lan',
      '+.local',
      '+.market.xiaomi.com'
    ],
    'default-nameserver': [
      'tls://223.5.5.5',
      'tls://223.6.6.6'
    ],
    nameserver: [
      'https://doh.pub/dns-query',
      'https://dns.alidns.com/dns-query'
    ]
  };
  
  config['proxy-groups'] = [
    {
      name: 'Proxy',
      type: 'select',
      'include-all': true,
      'exclude-type': 'direct'
    },
    {
      name: "GLOBAL",
      type: "select",
      proxies: [
        "Proxy"
      ],
      "include-all": true,
      "exclude-type": "direct"
    }
  ];
  
  config.rules = [
    'RULE-SET,private_ip,DIRECT,no-resolve',
    'RULE-SET,private_domain,DIRECT',
    'RULE-SET,reject_domain,REJECT',
    'RULE-SET,telegram_domain,Proxy',
    'RULE-SET,telegram_ip,Proxy,no-resolve',
    'RULE-SET,google_domain,Proxy',
    'RULE-SET,google_ip,Proxy,no-resolve',
    'RULE-SET,ai_domain,Proxy',
    'RULE-SET,github_domain,Proxy',
    'RULE-SET,youtube_domain,Proxy',
    'RULE-SET,tiktok_domain,Proxy',
    'RULE-SET,twitter_domain,Proxy',
    'RULE-SET,instagram_domain,Proxy',
    'RULE-SET,microsoft_domain,DIRECT',
    'RULE-SET,geolocation-!cn,Proxy',
    'RULE-SET,cn_domain,DIRECT',
    'RULE-SET,cn_ip,DIRECT',
    'MATCH,Proxy'
  ];
  
  const domainConfig = {
    type: 'http',
    interval: 86400,
    behavior: 'domain',
    format: 'mrs'
  };
  const yamlConfig = {
    type: 'http',
    interval: 86400,
    behavior: 'domain',
    format: 'yaml'
  };
  const ipConfig = {
    type: 'http',
    interval: 86400,
    behavior: 'ipcidr',
    format: 'mrs'
  };
  
  config['rule-providers'] = {
    private_domain: {
      ...domainConfig,
      url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/private.mrs'
    },
    reject_domain: {
      ...yamlConfig,
      url: 'https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Clash.yaml'
    },
    ai_domain: {
      ...domainConfig,
      url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/category-ai-!cn.mrs'
    },
    youtube_domain: {
      ...domainConfig,
      url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/youtube.mrs'
    },
    google_domain: {
      ...domainConfig,
      url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/google.mrs'
    },
    github_domain: {
      ...domainConfig,
      url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/github.mrs'
    },
    telegram_domain: {
      ...domainConfig,
      url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/telegram.mrs'
    },
    instagram_domain: {
      ...domainConfig,
      url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/instagram.mrs'
    },
    microsoft_domain: {
      ...domainConfig,
      url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/microsoft.mrs'
    },
    tiktok_domain: {
      ...domainConfig,
      url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/tiktok.mrs'
    },
    twitter_domain: {
      ...domainConfig,
      url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/twitter.mrs'
    },
    'geolocation-!cn': {
      ...domainConfig,
      url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/geolocation-!cn.mrs'
    },
    cn_domain: {
      ...domainConfig,
      url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/cn.mrs'
    },
    private_ip: {
      ...ipConfig,
      url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geoip/private.mrs'
    },
    cn_ip: {
      ...ipConfig,
      url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geoip/cn.mrs'
    },
    google_ip: {
      ...ipConfig,
      url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geoip/google.mrs'
    },
    telegram_ip: {
      ...ipConfig,
      url: 'https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geoip/telegram.mrs'
    }
  };
  return config;
};

