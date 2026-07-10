import React, { useEffect, useRef, useState } from 'react';

const profile = {
  name: '黄燕',
  roles: ['视觉设计师', 'AI 设计师', '品牌设计师'],
  email: '1632521144@qq.com',
  phone: '13146315693',
  education: '湖北第二师范学院 · 视觉设计 · 本科',
  headline: '为复杂数字产品构建设计清晰、体验可信的智能视觉系统。',
  summary:
    '6 年全链路 UI/视觉设计经验，覆盖用户研究、需求拆解、交互架构、视觉定义、组件体系与开发落地。擅长将工业、政务、金融、能源等复杂业务转译为清晰、高级、可交付的数字体验，并使用 AIGC 提升概念探索、素材生成与方案推演效率。'
};

const navItems = [
  { label: '首页', href: '#top' },
  { label: '个人经历', href: '#experience' },
  { label: '作品能力', href: '#works' },
  { label: '联系我', href: '#contact' }
];

const homeAnchorTargets = new Set(['#top', '#experience', '#works', '#contact']);

const experiences = [
  {
    period: '2021.09 - 至今',
    company: '上海精匠信息科技有限公司',
    role: 'UI 设计师',
    tags: ['B 端后台', '移动端', '数据可视化', '组件库'],
    text:
      '负责小程序、APP、数据可视化及企业 B 端界面全流程设计。独立承接需求拆解、页面视觉、交互梳理与落地规范制定，主导基础组件库与视觉标准搭建，实现跨产品、跨端设计语言统一。'
  },
  {
    period: '2020.03 - 2021.09',
    company: '上海魔思文化传播有限公司',
    role: 'UI 设计师',
    tags: ['企业官网', '可视化大屏', '交互原型'],
    text:
      '聚焦数据可视化大屏与企业级 B 端后台，主导复杂业务架构梳理、信息层级规划、B 端视觉规范与组件体系，覆盖需求评审、方案输出、开发走查及版本迭代全流程。'
  },
  {
    period: '2016.09 - 2020.06',
    company: '湖北第二师范学院',
    role: '视觉设计 · 本科',
    tags: ['视觉传达', '品牌基础', '版式系统'],
    text:
      '建立视觉设计、品牌传播、版式系统与多媒介表达基础，为后续产品界面、运营视觉、品牌化数字体验设计形成稳定的方法论底盘。'
  }
];

const capabilityCards = [
  {
    slug: 'mobile',
    title: '移动端设计',
    image: '/portfolio/category-mobile.jpg',
    items: [
      { slug: 'charging-app', title: '智享充电APP', summary: '整合全国充电桩资源，提供找桩、充电、支付与优惠一站式服务，连接车主与主流运营商，降低找桩难、充电贵、操作繁成本。', image: '/portfolio/charging-app.jpg' },
      { slug: 'taifu-app', title: '掌上太傅APP改版', summary: '面向高净值客户的财富管理平台，聚合持牌金融机构与线上线下服务，重构移动工作台与核心路径，提升服务专业感与使用效率。', image: '/portfolio/taifu-app.jpg' },
      { slug: 'peining-mini-program', title: '陪宁诊小程序', summary: '聚焦孤独就医场景，帮助用户快速预约专业陪诊师，兼顾医疗关怀与情感支持，强化安全感、专业性与人性化体验。', image: '/portfolio/mobile-app.jpg' }
    ]
  },
  {
    slug: 'web',
    title: 'Web端设计',
    image: '/portfolio/category-web.jpg',
    items: [
      { slug: 'mes-system', title: 'MES生产执行管理系统', summary: '面向工厂车间的 ToB MES 后台，承接 ERP 订单并联动产线设备，打通工艺、生产、质检与仓储链路，支撑精益生产管控。', image: '/portfolio/mes-system.jpg' },
      { slug: 'task-command-center', title: '任务指令中心', summary: '面向公安消防的应急任务管理后台，覆盖任务配置、派发、执行、回传与统计闭环，提升指挥联动效率与流程追溯能力。', image: '/portfolio/task-center.jpg' },
      { slug: 'yinglian-cloud', title: '影联云享', summary: '基于四视图阅片与三维建模工作台，融合 AI 临床问答，兼顾放射诊断操作逻辑与智能辅助，打造轻量高效诊疗体验。', image: '/portfolio/web-backend.jpg' }
    ]
  },
  {
    slug: 'dashboard',
    title: '可视化大屏',
    image: '/portfolio/category-dashboard.jpg',
    items: [
      { slug: 'dca-control', title: 'DCA空气碳捕集智能控制中心', summary: '通过 3D 数字孪生监控空气碳捕集流程，统览气体流量、温压状态与 CO₂ 转化量，用数据呈现绿色环保价值。', image: '/portfolio/details/dca-control/image-01.jpg', popoverImage: '/portfolio/details/dca-control/image-01.jpg' },
      { slug: 'zhougang-warehouse-twin', title: '周岗仓库数字孪生系统', summary: '以数字孪生呈现仓储空间、设备状态与运营态势，支持库存、告警、任务流转和现场监测一屏统览。', image: '/portfolio/details/zhougang-warehouse-twin/image-01.jpg', popoverImage: '/portfolio/popover/dashboard/zhougang-warehouse-twin.jpg' },
      { slug: 'smart-dispatch-center', title: '智能调度中心', summary: '一屏统览卷烟厂产销、车间孪生、原料消耗与环境监测，帮助传统制造过程看得见、管得住、更高效。', image: '/portfolio/details/smart-dispatch-center/image-01.jpg', popoverImage: '/portfolio/popover/dashboard/smart-dispatch-center.jpg' },
      { slug: 'clay-lab-screen', title: '黏土矿物提取实验管控大屏', summary: '实验流程、设备参数与结果数据的管控大屏设计。', image: '/portfolio/details/clay-lab-screen/image-01.jpg', popoverImage: '/portfolio/popover/dashboard/clay-lab-screen-2.jpg' }
    ]
  },
  {
    slug: 'operation',
    title: '运营视觉设计',
    image: '/portfolio/category-operation.jpg',
    items: [
      { slug: 'consumer-operation', title: 'C端运营视觉设计', summary: '活动 banner、营销专题与 C 端增长物料设计。', image: '/portfolio/consumer-operation-cover.jpg', popoverImage: '/portfolio/consumer-operation-cover.jpg' },
      { slug: 'aigc-practice', title: 'AIGC设计练手', summary: '使用 AIGC 辅助视觉概念、素材生成和风格探索。', image: '/portfolio/visual-design.jpg' }
    ]
  }
];

const skills = [
  'Sketch',
  'Figma',
  'AIGC',
  'Illustrator',
  'Photoshop',
  'Blender',
  'After Effects',
  'Video Editing'
];

function makeDetailImages(folder, count) {
  return Array.from(
    { length: count },
    (_, index) => `/portfolio/details/${folder}/image-${String(index + 1).padStart(2, '0')}.jpg`
  );
}

const projectDetailImages = {
  'charging-app': makeDetailImages('charging-app', 10),
  'taifu-app': makeDetailImages('taifu-app', 9),
  'peining-mini-program': makeDetailImages('peining-mini-program', 5),
  'mes-system': makeDetailImages('mes-system', 13),
  'task-command-center': makeDetailImages('task-command-center', 7),
  'yinglian-cloud': makeDetailImages('yinglian-cloud', 5),
  'dca-control': makeDetailImages('dca-control', 1),
  'zhougang-warehouse-twin': makeDetailImages('zhougang-warehouse-twin', 1),
  'smart-dispatch-center': makeDetailImages('smart-dispatch-center', 1),
  'clay-lab-screen': makeDetailImages('clay-lab-screen', 1),
  'consumer-operation': makeDetailImages('consumer-operation', 2),
  'aigc-practice': makeDetailImages('aigc-practice', 3)
};

const projectHeroVideos = {
  'dca-control': [
    '/portfolio/details/dca-control/video-01.mp4'
  ],
  'yinglian-cloud': [
    '/portfolio/details/yinglian-cloud/video-01.mp4',
    '/portfolio/details/yinglian-cloud/video-02.mp4'
  ]
};

const fullLengthDetailProjectSlugs = new Set([
  'zhougang-warehouse-twin',
  'smart-dispatch-center',
  'clay-lab-screen',
  'consumer-operation'
]);

const legacyDashboardProjectSlugs = new Set([
  'energy-system',
  'production-board',
  'other-dashboard'
]);

function getProjectCoverImage(project, category) {
  return project.popoverImage || projectDetailImages[project.slug]?.[0] || project.image || category.image;
}

function useInteractions(effectKey) {
  useEffect(() => {
    const progress = document.querySelector('.scroll-progress');
    const revealItems = document.querySelectorAll('.reveal');
    const tiltCards = document.querySelectorAll('.tilt-card');
    const magneticButtons = document.querySelectorAll('.magnetic');

    const updateScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const value = total > 0 ? window.scrollY / total : 0;
      progress?.style.setProperty('--progress', `${Math.max(0, Math.min(1, value))}`);
      document.body.classList.toggle('is-scrolled', window.scrollY > 16);
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    tiltCards.forEach((card) => {
      const moveTilt = (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--tilt-x', `${Math.max(-5, Math.min(5, -y * 7))}deg`);
        card.style.setProperty('--tilt-y', `${Math.max(-5, Math.min(5, x * 7))}deg`);
        card.style.setProperty('--spot-x', `${(x + 0.5) * 100}%`);
        card.style.setProperty('--spot-y', `${(y + 0.5) * 100}%`);
      };
      const resetTilt = () => {
        card.style.removeProperty('--tilt-x');
        card.style.removeProperty('--tilt-y');
        card.style.removeProperty('--spot-x');
        card.style.removeProperty('--spot-y');
      };
      card.addEventListener('mousemove', moveTilt);
      card.addEventListener('mouseleave', resetTilt);
    });

    magneticButtons.forEach((button) => {
      const moveMagnet = (event) => {
        const rect = button.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 14;
        button.style.setProperty('--mx', `${x}px`);
        button.style.setProperty('--my', `${y}px`);
      };
      const resetMagnet = () => {
        button.style.removeProperty('--mx');
        button.style.removeProperty('--my');
      };
      button.addEventListener('mousemove', moveMagnet);
      button.addEventListener('mouseleave', resetMagnet);
      button.addEventListener('blur', resetMagnet);
    });

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScroll);
      revealObserver.disconnect();
    };
  }, [effectKey]);
}

function useActiveNav() {
  const [activeNav, setActiveNav] = useState('#top');

  useEffect(() => {
    const getTop = (selector) => {
      const element = document.querySelector(selector);
      return element ? element.getBoundingClientRect().top + window.scrollY : Number.POSITIVE_INFINITY;
    };

    const updateActiveNav = () => {
      const scrollPoint = window.scrollY + Math.min(window.innerHeight * 0.38, 360);
      const experienceTop = getTop('#experience');
      const worksTop = getTop('#works');
      const contactTop = getTop('#contact');

      if (scrollPoint >= contactTop - 80) {
        setActiveNav('#contact');
      } else if (scrollPoint >= worksTop - 80) {
        setActiveNav('#works');
      } else if (scrollPoint >= experienceTop - 80) {
        setActiveNav('#experience');
      } else {
        setActiveNav('#top');
      }
    };

    updateActiveNav();
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    window.addEventListener('resize', updateActiveNav);

    return () => {
      window.removeEventListener('scroll', updateActiveNav);
      window.removeEventListener('resize', updateActiveNav);
    };
  }, []);

  return activeNav;
}

function TimelineDate({ period }) {
  const parts = period.split(' - ');

  return (
    <div className="timeline-date" aria-label={period}>
      {parts.map((part) => (
        <span key={part}>{part}</span>
      ))}
    </div>
  );
}

function ContactIcon({ name }) {
  const paths = {
    phone: (
      <path d="M7.5 4.5 10 4l1.4 4.1-1.7 1.1a12.6 12.6 0 0 0 5.1 5.1l1.1-1.7L20 14l-.5 2.5c-.2 1-1.1 1.7-2.1 1.6C10.9 17.8 6.2 13.1 5.9 6.6c-.1-1 .6-1.9 1.6-2.1Z" />
    ),
    mail: (
      <>
        <path d="M4.5 6.5h15v11h-15z" />
        <path d="m5 7 7 5 7-5" />
      </>
    ),
    wechat: (
      <>
        <path d="M10.7 7.3a5.5 4.2 0 0 0-5.7 4.1 3.9 3.9 0 0 0 2.2 3.4l-.4 1.6 1.8-.9a6.3 6.3 0 0 0 1.9.3" />
        <path d="M13.8 10.2a4.9 3.7 0 0 1 5.2 3.7 3.5 3.5 0 0 1-1.9 3l.3 1.4-1.6-.8a5.7 5.7 0 0 1-2 .3 4.9 3.7 0 0 1-5.1-3.7 4.9 3.7 0 0 1 5.1-3.9Z" />
        <path d="M8.3 10.8h.1M11.1 10.8h.1M12.4 13.8h.1M15.1 13.8h.1" />
      </>
    ),
    file: (
      <>
        <path d="M7 4.5h6l4 4v11H7z" />
        <path d="M13 4.5v4h4" />
        <path d="M9.5 12.5h5M9.5 15.5h5" />
      </>
    )
  };

  return (
    <svg className="contact-tag-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function splitTitleText(text) {
  const chunks = text.match(/[A-Za-z0-9]+|[\u4e00-\u9fa5]{1,4}|\s+|[^\s]/g);
  return chunks || [text];
}

function AnimatedTitle({ id, text, className = '' }) {
  return (
    <h2 id={id} className={`animated-title reveal ${className}`.trim()}>
      {splitTitleText(text).map((word, index) => (
        <span
          className="title-word"
          key={`${word}-${index}`}
          style={{ '--word-index': index }}
        >
          {/\s/.test(word) ? word.replace(/\s/g, '\u00a0') : word}
        </span>
      ))}
    </h2>
  );
}

function getWorkRoute() {
  const hash = window.location.hash || '';
  const categoryMatch = hash.match(/^#works\/([^/]+)$/);
  const projectMatch = hash.match(/^#project\/([^/]+)$/);

  if (categoryMatch) return { type: 'category', slug: categoryMatch[1], key: hash };
  if (projectMatch) {
    if (legacyDashboardProjectSlugs.has(projectMatch[1])) {
      return { type: 'category', slug: 'dashboard', key: '#works/dashboard' };
    }

    return { type: 'project', slug: projectMatch[1], key: hash };
  }

  return null;
}

function useWorkRoute() {
  const [route, setRoute] = useState(getWorkRoute);

  useEffect(() => {
    const updateRoute = () => {
      const nextRoute = getWorkRoute();
      setRoute(nextRoute);
      if (nextRoute) {
        window.scrollTo({ top: 0, left: 0 });
      }
    };

    window.addEventListener('hashchange', updateRoute);
    updateRoute();

    return () => window.removeEventListener('hashchange', updateRoute);
  }, []);

  useEffect(() => {
    if (route) return undefined;

    const hash = window.location.hash || '#top';
    if (!homeAnchorTargets.has(hash)) return undefined;

    const frame = window.requestAnimationFrame(() => {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ block: 'start' });
      } else {
        window.scrollTo({ top: 0, left: 0 });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [route]);

  return route;
}

function findProject(slug) {
  for (const category of capabilityCards) {
    const project = category.items.find((item) => item.slug === slug);
    if (project) return { category, project };
  }

  return null;
}

function WorkCategoryPage({ category }) {
  if (!category) {
    return (
      <section className="work-page">
        <div className="work-page-inner">
          <a className="back-link" href="#works">返回作品能力</a>
          <h1>没有找到这个作品分类。</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="work-page" aria-labelledby="category-title">
      <div className="work-page-inner">
        <a className="back-link" href="#works">返回作品能力</a>
        <div className="work-detail-hero reveal">
          <img src={category.image} alt={`${category.title} 预览`} decoding="async" fetchPriority="high" />
          <div>
            <h1 id="category-title">{category.title}</h1>
            <p>UI / UX 案例展示</p>
          </div>
        </div>

        <div className="project-grid">
          {category.items.map((project, index) => (
            <a
              className={`project-card reveal delay-${index}`}
              href={`#project/${project.slug}`}
              key={project.slug}
            >
              <div className="project-card-media">
                <img
                  src={getProjectCoverImage(project, category)}
                  alt={`${project.title} 预览`}
                  decoding="async"
                  loading="lazy"
                />
              </div>
              <div className="project-card-body">
                <div className="project-card-title-row">
                  <span className="project-card-index">{String(index + 1).padStart(2, '0')}</span>
                  <h2>{project.title}</h2>
                </div>
                <p>{project.summary}</p>
                <b>
                  查看详情
                  <span aria-hidden="true">↗</span>
                </b>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectDetailPage({ result }) {
  if (!result) {
    return (
      <section className="work-page">
        <div className="work-page-inner">
          <a className="back-link" href="#works">返回作品能力</a>
          <h1>没有找到这个项目。</h1>
        </div>
      </section>
    );
  }

  const { category, project } = result;
  const detailImages = projectDetailImages[project.slug];
  const heroVideos = projectHeroVideos[project.slug] || [];
  const heroImage = detailImages?.[0] || project.image || category.image;
  const isFullLengthDetailProject = fullLengthDetailProjectSlugs.has(project.slug);
  const restImages = isFullLengthDetailProject ? detailImages || [] : detailImages?.slice(1) || [];
  const detailImageStartIndex = isFullLengthDetailProject ? 1 : 2;

  return (
    <section
      className={`work-page project-page image-project-page${isFullLengthDetailProject ? ' is-full-image-page' : ''}`}
      aria-label={`${project.title} 项目详情`}
    >
      <a className="image-project-back" href={`#works/${category.slug}`}>返回{category.title}</a>
      {!isFullLengthDetailProject ? (
        <div
          aria-label={`${project.title} 首屏视觉`}
          className="image-project-hero"
          role="img"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
      ) : null}
      {heroVideos.length > 0 ? (
        <div className="project-video-stack" aria-label={`${project.title} 动效展示`}>
          {heroVideos.map((videoSrc) => (
            <video
              autoPlay
              className="project-detail-video"
              key={videoSrc}
              loop
              muted
              playsInline
              preload="metadata"
              poster={heroImage}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ))}
        </div>
      ) : null}
      {restImages.length > 0 ? (
        <div className="image-detail-stack">
          {restImages.map((src, index) => (
            <img
              src={src}
              alt={`${project.title} 详情图 ${index + detailImageStartIndex}`}
              key={src}
              loading="lazy"
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function App() {
  const detectedNav = useActiveNav();
  const workRoute = useWorkRoute();
  const worksPopoverCloseTimer = useRef(null);
  const [popoverCategorySlug, setPopoverCategorySlug] = useState(capabilityCards[0].slug);
  const [activePopoverProjectSlug, setActivePopoverProjectSlug] = useState(capabilityCards[0].items[0].slug);
  const [isWorksPopoverOpen, setWorksPopoverOpen] = useState(false);
  const [isWechatOpen, setWechatOpen] = useState(false);
  const [contactMode, setContactMode] = useState('intro');
  const [popoverMotion, setPopoverMotion] = useState({ x: 0, y: 0 });
  const activeNav = workRoute ? '#works' : detectedNav;
  useInteractions(workRoute?.key || 'home');
  const categoryRoute = workRoute?.type === 'category'
    ? capabilityCards.find((card) => card.slug === workRoute.slug)
    : null;
  const projectRoute = workRoute?.type === 'project' ? findProject(workRoute.slug) : null;
  const popoverCategory = capabilityCards.find((card) => card.slug === popoverCategorySlug) || capabilityCards[0];
  const activePopoverProject =
    popoverCategory.items.find((project) => project.slug === activePopoverProjectSlug) || popoverCategory.items[0] || null;
  const selectPopoverCategory = (card) => {
    setPopoverCategorySlug(card.slug);
    setActivePopoverProjectSlug(card.items[0]?.slug || '');
  };
  const openWorksPopover = () => {
    if (worksPopoverCloseTimer.current) {
      window.clearTimeout(worksPopoverCloseTimer.current);
      worksPopoverCloseTimer.current = null;
    }
    setWorksPopoverOpen(true);
  };
  const closeWorksPopover = () => {
    if (worksPopoverCloseTimer.current) {
      window.clearTimeout(worksPopoverCloseTimer.current);
      worksPopoverCloseTimer.current = null;
    }
    setWorksPopoverOpen(false);
  };
  const scheduleWorksPopoverClose = () => {
    if (worksPopoverCloseTimer.current) {
      window.clearTimeout(worksPopoverCloseTimer.current);
    }
    worksPopoverCloseTimer.current = window.setTimeout(() => {
      setWorksPopoverOpen(false);
      worksPopoverCloseTimer.current = null;
    }, 220);
  };
  const updatePopoverMotion = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 22;
    setPopoverMotion({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
  };
  const handleContactSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const lead = {
      email: String(formData.get('邮箱') || '').trim(),
      name: String(formData.get('称呼') || '').trim(),
      message: String(formData.get('合作内容') || '').trim(),
      createdAt: new Date().toISOString()
    };

    try {
      const parsedLeads = JSON.parse(window.localStorage.getItem('portfolioContactLeads') || '[]');
      const savedLeads = Array.isArray(parsedLeads) ? parsedLeads : [];
      window.localStorage.setItem('portfolioContactLeads', JSON.stringify([lead, ...savedLeads].slice(0, 50)));
    } catch {
      // Sending the email should still work even if local storage is unavailable.
    }

    const subject = `作品集联系表单 - ${lead.name || '新客户'}`;
    const body = [
      '你收到一条来自个人作品集网站的合作消息：',
      '',
      `称呼：${lead.name || '未填写'}`,
      `邮箱：${lead.email || '未填写'}`,
      `提交时间：${new Date(lead.createdAt).toLocaleString('zh-CN')}`,
      '',
      '合作内容：',
      lead.message || '未填写'
    ].join('\n');

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  useEffect(() => {
    if (!isWorksPopoverOpen) {
      return undefined;
    }

    const scrollY = window.scrollY;
    const previousBodyStyles = {
      left: document.body.style.left,
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      right: document.body.style.right,
      top: document.body.style.top,
      width: document.body.style.width
    };

    document.body.classList.add('is-popover-open');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.classList.remove('is-popover-open');
      document.body.style.left = previousBodyStyles.left;
      document.body.style.overflow = previousBodyStyles.overflow;
      document.body.style.position = previousBodyStyles.position;
      document.body.style.right = previousBodyStyles.right;
      document.body.style.top = previousBodyStyles.top;
      document.body.style.width = previousBodyStyles.width;
      window.scrollTo(0, scrollY);
    };
  }, [isWorksPopoverOpen]);

  useEffect(() => () => {
    if (worksPopoverCloseTimer.current) {
      window.clearTimeout(worksPopoverCloseTimer.current);
    }
  }, []);

  useEffect(() => {
    if (!isWechatOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setWechatOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isWechatOpen]);

  return (
    <main id="top">
      <div className="scroll-progress" />

      <header className="site-nav" aria-label="主导航">
        <a className="brand" href="#top" aria-label="黄燕个人作品集首页">
          <span className="brand-mark">HY</span>
          <span>黄燕</span>
        </a>
        <nav>
          {navItems.map((item) => {
            const isWorks = item.href === '#works';

            if (!isWorks) {
              return (
                <a
                  key={item.href}
                  className={activeNav === item.href ? 'is-active' : undefined}
                  href={item.href}
                  aria-current={activeNav === item.href ? 'page' : undefined}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <div
                className={`nav-menu-item${isWorksPopoverOpen ? ' is-open' : ''}`}
                key={item.href}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    closeWorksPopover();
                  }
                }}
                onFocusCapture={openWorksPopover}
                onMouseEnter={openWorksPopover}
                onMouseLeave={scheduleWorksPopoverClose}
                onMouseOver={openWorksPopover}
                onPointerEnter={openWorksPopover}
                onPointerLeave={scheduleWorksPopoverClose}
              >
                <a
                  className={activeNav === item.href ? 'is-active' : undefined}
                  href={item.href}
                  aria-current={activeNav === item.href ? 'page' : undefined}
                  aria-expanded={isWorksPopoverOpen}
                  onClick={() => setWorksPopoverOpen(true)}
                >
                  {item.label}
                </a>
                <div
                  className="works-popover"
                  aria-label="作品能力快速入口"
                  onMouseEnter={openWorksPopover}
                  onMouseMove={updatePopoverMotion}
                  onPointerEnter={openWorksPopover}
                  onWheel={(event) => event.stopPropagation()}
                  style={{
                    '--pop-x': `${popoverMotion.x}px`,
                    '--pop-y': `${popoverMotion.y}px`
                  }}
                >
                  <span className="popover-boot-dot" aria-hidden="true" />
                  <span className="popover-scan-line" aria-hidden="true" />
                  <span className="popover-bg-word" aria-hidden="true">个人作品模块</span>
                  <div className="popover-column popover-category">
                    <span>设计领域 / Design Domain</span>
                    {capabilityCards.map((card) => (
                      <button
                        className={popoverCategory.slug === card.slug ? 'is-selected' : undefined}
                        key={card.slug}
                        onClick={() => selectPopoverCategory(card)}
                        onFocus={() => selectPopoverCategory(card)}
                        onMouseEnter={() => selectPopoverCategory(card)}
                        type="button"
                      >
                        <span className="popover-menu-index">{String(capabilityCards.indexOf(card) + 1).padStart(2, '0')}</span>
                        <span>{card.title}</span>
                      </button>
                    ))}
                  </div>
                  <div className="popover-column popover-projects">
                    <div className="popover-project-head">
                      <span>精选案例 / Featured Projects</span>
                      <a href={`#works/${popoverCategory.slug}`} onClick={closeWorksPopover}>进入{popoverCategory.title}</a>
                    </div>
                    <div className="popover-stage" key={popoverCategory.slug}>
                      {popoverCategory.items.length > 0 ? (
                        popoverCategory.items.map((project) => (
                          <a
                            className={`popover-case-card${activePopoverProject?.slug === project.slug ? ' is-active' : ''}`}
                            href={`#project/${project.slug}`}
                            key={project.slug}
                            onClick={closeWorksPopover}
                            onFocus={() => setActivePopoverProjectSlug(project.slug)}
                            onMouseEnter={() => setActivePopoverProjectSlug(project.slug)}
                          >
                            <div className="popover-case-media">
                              <img
                                alt={`${project.title} 首图`}
                                decoding="async"
                                loading="lazy"
                                src={getProjectCoverImage(project, popoverCategory)}
                              />
                            </div>
                            <div className="popover-case-copy">
                              <strong>{project.title}</strong>
                              <p>{project.summary}</p>
                              <b>查看详情</b>
                            </div>
                          </a>
                        ))
                      ) : (
                        <a
                          className="popover-case-card popover-gallery-card is-active"
                          href={`#works/${popoverCategory.slug}`}
                          onClick={closeWorksPopover}
                        >
                          <div className="popover-case-media">
                            <img
                              alt={`${popoverCategory.title} 首图`}
                              decoding="async"
                              loading="lazy"
                              src={popoverCategory.image}
                            />
                          </div>
                          <div className="popover-case-copy">
                            <strong>{popoverCategory.title}</strong>
                            <p>不再拆分三级页面，进入后直接查看完整大屏作品图。</p>
                            <b>查看详情</b>
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
        <div className="nav-actions">
          <a className="nav-login" href={`mailto:${profile.email}`}>
            邮箱
          </a>
          <button className="nav-contact magnetic" onClick={() => setWechatOpen(true)} type="button">
            联系我
          </button>
        </div>
      </header>

      {isWechatOpen ? (
        <div
          className="wechat-modal"
          role="dialog"
          aria-modal="true"
          aria-label="微信二维码"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setWechatOpen(false);
            }
          }}
        >
          <div className="wechat-card">
            <button className="wechat-close" onClick={() => setWechatOpen(false)} type="button" aria-label="关闭微信二维码">
              ×
            </button>
            <span>微信联系 / WeChat</span>
            <img src="/portfolio/wechat-qr.jpg" alt="黄燕微信二维码" />
            <p>扫码添加微信，开启下一次协作。</p>
          </div>
        </div>
      ) : null}

      {workRoute ? (
        workRoute.type === 'category' ? (
          <WorkCategoryPage category={categoryRoute} />
        ) : (
          <ProjectDetailPage result={projectRoute} />
        )
      ) : (
        <>
      <section className="hero" aria-labelledby="hero-title">
            <img
              src="/hero-upload-banner.jpg"
              className="hero-video"
              alt=""
              aria-hidden="true"
              decoding="async"
              fetchPriority="high"
            />
        <div className="hero-shade" />
        <div className="hero-grid" />
        <div className="hero-shell">
          <div className="hero-copy">
            <p className="eyebrow reveal">「2022~2026」</p>
            <h1 id="hero-title" className="hero-title">
              <span className="mask-line reveal">
                <span>设计作品整理</span>
              </span>
            </h1>
            <p className="hero-subtitle reveal delay-1">解锁设计驱动力，从核心出发。</p>
            <div className="hero-actions reveal delay-2">
              <a className="primary-action magnetic" href="#works">
                查看作品
                <span aria-hidden="true">↗</span>
              </a>
              <button className="ghost-action magnetic" onClick={() => setWechatOpen(true)} type="button">
                联系我
              </button>
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <span>向下探索</span>
          <span>{profile.email}</span>
        </div>
      </section>

      <section className="section intro-section experience-section section-reveal reveal" id="experience" aria-labelledby="experience-title">
        <div className="content-wrap">
          <div className="section-head">
            <p className="eyebrow">个人经历</p>
            <AnimatedTitle id="experience-title" text="CORE · 内核" />
            <p>6年全链路经验，构建智能视觉系统的基石。</p>
          </div>
          <div className="timeline">
            {experiences.map((item, index) => (
              <article className={`timeline-item reveal delay-${index}`} key={`${item.period}-${item.company}`}>
                <TimelineDate period={item.period} />
                <div className="timeline-body">
                  <h3>
                    {item.company}
                    {' '}
                    <span className="timeline-role">{item.role}</span>
                  </h3>
                  <p>{item.text}</p>
                  <div className="tag-list">
                    {item.tags.map((tag) => (
                      <b key={tag}>{tag}</b>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section works-section section-reveal reveal" id="works" aria-labelledby="works-title">
        <div className="content-wrap">
          <div className="section-head center">
            <p className="eyebrow">作品展示</p>
            <AnimatedTitle id="works-title" text="MATRIX · 矩阵" />
            <p>以能力为线索的能力图谱，拒绝简单堆砌。</p>
          </div>

          <div className="capability-grid">
            {capabilityCards.map((card, index) => (
              <a
                className={`capability-card tilt-card reveal delay-${index}`}
                href={`#works/${card.slug}`}
                key={card.title}
                aria-label={`查看${card.title}作品`}
              >
                <img src={card.image} alt={`${card.title} 作品方向预览`} decoding="async" loading="lazy" />
                <div className="capability-content">
                  <h3>{card.title}</h3>
                  <ul className="capability-list">
                    {card.items.map((item) => (
                      <li key={item.slug}>{item.title}</li>
                    ))}
                  </ul>
                  <span className="card-more">
                    查看更多
                    <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="skill-marquee" aria-label="软件技能">
            <div className="skill-track">
              {[...skills, ...skills].map((skill, index) => (
                <span key={`${skill}-${index}`}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section section-reveal reveal" id="contact" aria-labelledby="contact-title">
        <div className="contact-bg" />
        <div className="contact-inner">
          <div className="contact-card">
            <div className="contact-portrait" aria-hidden="true">
              <img src="/profile-photo.jpg" alt="" decoding="async" loading="lazy" />
            </div>
            <div className="contact-copy">
              <div className="contact-arrow-switch" aria-label="联系区切换">
                <button
                  onClick={() => setContactMode(contactMode === 'intro' ? 'contact' : 'intro')}
                  type="button"
                  aria-label="切换上一页"
                >
                  ←
                </button>
                <button
                  onClick={() => setContactMode(contactMode === 'intro' ? 'contact' : 'intro')}
                  type="button"
                  aria-label="切换下一页"
                >
                  →
                </button>
              </div>
              {contactMode === 'contact' ? (
                <>
                  <p className="eyebrow">联系我</p>
                  <AnimatedTitle id="contact-title" text="LINK · 链接" />
                  <p>发起信号，开启下一次协作。</p>
                  <form className="contact-form" onSubmit={handleContactSubmit}>
                    <div className="contact-fields">
                      <input type="email" name="邮箱" placeholder="你的邮箱" aria-label="你的邮箱" required />
                      <input type="text" name="称呼" placeholder="你的称呼" aria-label="你的称呼" />
                    </div>
                    <textarea
                      name="合作内容"
                      placeholder="简单说说项目、团队或合作方向..."
                      aria-label="合作内容"
                      required
                    />
                    <div className="contact-submit-row">
                      <button className="contact-submit magnetic" type="submit">发送消息</button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="intro-panel">
                  <p className="eyebrow">自我介绍</p>
                  <AnimatedTitle id="contact-title" text="您好，我是黄燕！" />
                  <div className="intro-copy">
                    <p>
                      拥有 6 年全链路 UI 设计经验，具备从用户研究、需求拆解、交互架构到视觉定义、组件搭建、开发落地的端到端交付能力。
                    </p>
                    <p>
                      可独立完成从需求调研、原型交互、视觉规范制定、多端适配到开发走查、迭代优化的完整设计流程；擅长通过复杂业务逻辑拆解与信息架构梳理，输出兼顾业务效率与用户体验的设计方案。
                    </p>
                  </div>
                  <div className="intro-tags" aria-label="联系信息">
                    <a href="tel:13146315693"><ContactIcon name="phone" /><span>13146315693</span></a>
                    <a href={`mailto:${profile.email}`}><ContactIcon name="mail" /><span>{profile.email}</span></a>
                    <button onClick={() => setWechatOpen(true)} type="button"><ContactIcon name="wechat" /><span>Y-13146315</span></button>
                    <a href="/huang-yan-resume.pdf" target="_blank" rel="noreferrer"><ContactIcon name="file" /><span>简历</span></a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
        </>
      )}
    </main>
  );
}

export default App;
