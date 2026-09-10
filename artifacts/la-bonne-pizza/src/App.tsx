import { type CSSProperties, type ReactNode, useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Bookmark, Clock3, Dog, Heart, Instagram, MapPin, Menu as MenuIcon, MessageCircle, Phone, Send, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import brandWordmark from '@assets/brand/la-bonne-wordmark-parmesao-v3.png';
import lisWordmark from '@assets/brand/lis-bonne-wordmark-parmesao-v3.png';
import brandSmiley from '@assets/brand/la-bonne-smiley.png';
import brandPizzaSlice from '@assets/brand/la-bonne-pizza-slice-art.png';
import { menuGroups, type Language, type MenuGroup, ui } from '@/content';
import { sitePhotos } from '@/sitePhotos';

const queryClient = new QueryClient();

function BrandLogo({ compact = false, language = 'pt' }: { compact?: boolean; language?: Language }) {
  const [showLisLogo, setShowLisLogo] = useState(false);
  const activeLogo = showLisLogo ? lisWordmark : brandWordmark;
  return (
    <a
      href="#top"
      className={`brand-logo ${compact ? 'brand-logo-compact' : ''}`}
      data-testid="link-brand-home"
      data-logo={showLisLogo ? 'lis' : 'la'}
      aria-label={`La Bonne Pizza · ${ui[language].backTop}`}
      onPointerEnter={() => setShowLisLogo(true)}
      onPointerLeave={() => setShowLisLogo(false)}
      onFocus={() => setShowLisLogo(true)}
      onBlur={() => setShowLisLogo(false)}
    >
      <img key={showLisLogo ? 'lis' : 'la'} className="brand-logo-image" src={activeLogo} alt="" aria-hidden="true" />
    </a>
  );
}

function SmileMark({ className = '' }: { className?: string }) {
  const maskStyle = {
    '--brand-mask': `url(${brandSmiley})`,
  } as CSSProperties;
  return (
    <span className={`smile-mark-svg ${className}`} style={maskStyle} aria-hidden="true" />
  );
}

const assistive = {
  pt: {
    heroAlt: 'Pizza preparada na La Bonne Pizza',
    menuAlt: 'Pizzaiolo a preparar uma pizza na La Bonne Pizza',
    drinksAlt: 'Amigos brindam com cocktails na La Bonne Pizza',
    storyAlt: 'Kevin e Giselle dentro da La Bonne Pizza',
    socialPizzaAlt: 'Pizza da La Bonne Pizza',
    socialOwnersAlt: 'Kevin e Giselle na La Bonne Pizza',
  },
  fr: {
    heroAlt: 'Pizza préparée chez La Bonne Pizza',
    menuAlt: 'Pizzaiolo préparant une pizza chez La Bonne Pizza',
    drinksAlt: 'Des amis trinquent avec des cocktails chez La Bonne Pizza',
    storyAlt: 'Kevin et Giselle dans La Bonne Pizza',
    socialPizzaAlt: 'Pizza de La Bonne Pizza',
    socialOwnersAlt: 'Kevin et Giselle chez La Bonne Pizza',
  },
  en: {
    heroAlt: 'Pizza prepared at La Bonne Pizza',
    menuAlt: 'Pizzaiolo preparing a pizza at La Bonne Pizza',
    drinksAlt: 'Friends raising cocktails at La Bonne Pizza',
    storyAlt: 'Kevin and Giselle inside La Bonne Pizza',
    socialPizzaAlt: 'Pizza from La Bonne Pizza',
    socialOwnersAlt: 'Kevin and Giselle at La Bonne Pizza',
  },
} as const;

const languageOptions: Array<{ value: Language; flag: string; short: string; label: string }> = [
  { value: 'pt', flag: '🇵🇹', short: 'PT', label: 'Português' },
  { value: 'fr', flag: '🇫🇷', short: 'FR', label: 'Français' },
  { value: 'en', flag: '🇬🇧', short: 'EN', label: 'English' },
];

const drinksMenu = {
  pt: [
    { title: 'Cocktails', items: ['Gin Tonic', 'Aperol Spritz'] },
    { title: 'Bebidas', items: ['Água Mineral Natural 37,5 cl', 'Água Mineral Natural 75 cl', 'Água Mineral com Gás 25 cl', 'Coca-Cola', 'Coca-Cola Zero', 'Ginger Beer', 'Kombucha Bio Original', 'Kombucha Bio Pêssego e Groselha', 'Limonata Polara 27,5 cl', 'Limonata Bio 27,5 cl'] },
    { title: 'Cervejas portuguesas', items: ['Super Bock Imperial 33 cl', 'Super Bock Caneca 50 cl'] },
    { title: 'Cervejas italianas', items: ['Moretti Originale 33 cl', 'Ichnusa Non Filtrata 33 cl'] },
    { title: 'Café', items: ['Espresso', 'Espresso Duplo', 'Cappuccino', 'Café Americano'] },
  ],
  fr: [
    { title: 'Cocktails', items: ['Gin Tonic', 'Aperol Spritz'] },
    { title: 'Boissons', items: ['Eau minérale plate 37,5 cl', 'Eau minérale plate 75 cl', 'Eau minérale gazeuse 25 cl', 'Coca-Cola', 'Coca-Cola Zero', 'Ginger Beer', 'Kombucha Bio Original', 'Kombucha Bio Pêche et Groseille', 'Limonata Polara 27,5 cl', 'Limonata Bio 27,5 cl'] },
    { title: 'Bières portugaises', items: ['Super Bock Imperial 33 cl', 'Super Bock Caneca 50 cl'] },
    { title: 'Bières italiennes', items: ['Moretti Originale 33 cl', 'Ichnusa Non Filtrata 33 cl'] },
    { title: 'Café', items: ['Espresso', 'Double espresso', 'Cappuccino', 'Café americano'] },
  ],
  en: [
    { title: 'Cocktails', items: ['Gin Tonic', 'Aperol Spritz'] },
    { title: 'Drinks', items: ['Still mineral water 37.5 cl', 'Still mineral water 75 cl', 'Sparkling mineral water 25 cl', 'Coca-Cola', 'Coca-Cola Zero', 'Ginger Beer', 'Original organic kombucha', 'Peach and redcurrant organic kombucha', 'Limonata Polara 27.5 cl', 'Organic limonata 27.5 cl'] },
    { title: 'Portuguese beers', items: ['Super Bock Imperial 33 cl', 'Super Bock Caneca 50 cl'] },
    { title: 'Italian beers', items: ['Moretti Originale 33 cl', 'Ichnusa Non Filtrata 33 cl'] },
    { title: 'Coffee', items: ['Espresso', 'Double espresso', 'Cappuccino', 'Americano'] },
  ],
} as const;

function LanguageSwitcher({ language, onChange, mobile = false }: { language: Language; onChange: (language: Language) => void; mobile?: boolean }) {
  return (
    <div className={`language-switcher ${mobile ? 'language-switcher-mobile' : ''}`} role="group" aria-label={ui[language].language}>
      {languageOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          className={language === option.value ? 'active' : ''}
          aria-pressed={language === option.value}
          aria-label={option.label}
          title={option.label}
          onClick={() => onChange(option.value)}
          data-testid={`button-language-${option.value}`}
        >
          <span aria-hidden="true">{option.flag}</span>
          <small>{option.short}</small>
        </button>
      ))}
    </div>
  );
}

function Nav({ language, onLanguageChange }: { language: Language; onLanguageChange: (language: Language) => void }) {
  const [open, setOpen] = useState(false);
  const c = ui[language];
  const links = [
    { href: '#menu', label: c.nav[0] },
    { href: '#historia', label: c.nav[1] },
    { href: '#visita', label: c.nav[2] },
    { href: '#contactos', label: c.nav[3] },
  ];
  return (
    <header className="site-nav" data-testid="header-navigation">
      <div className="nav-inner">
        <BrandLogo compact language={language} />
        <nav className="desktop-nav" aria-label={c.nav[0]}>
          {links.map((link) => <a key={link.href} href={link.href} data-testid={`link-nav-${link.label.toLowerCase().replaceAll(' ', '-')}`}>{link.label}</a>)}
        </nav>
        <LanguageSwitcher language={language} onChange={onLanguageChange} />
        <a className="nav-cta" href="tel:+351960182559" data-testid="link-call-reservation">
          <Phone size={15} strokeWidth={2.2} />
          <span>{c.reserve}</span>
        </a>
        <button className="mobile-menu-trigger" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? c.mobileClose : c.mobileOpen} data-testid="button-mobile-menu">
          {open ? <X size={23} /> : <MenuIcon size={23} />}
        </button>
      </div>
      {open && (
        <nav className="mobile-nav reveal" aria-label={c.mobileOpen}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} data-testid={`link-mobile-${link.label.toLowerCase().replaceAll(' ', '-')}`}>{link.label}<ArrowUpRight size={16} /></a>
          ))}
          <a href="tel:+351960182559" className="mobile-call" data-testid="link-mobile-call"><Phone size={16} /> +351 960 182 559</a>
        </nav>
      )}
    </header>
  );
}

function TopTicker({ language }: { language: Language }) {
  const c = ui[language];
  return (
    <div className="top-ticker" data-testid="banner-hours">
      <div className="ticker-track">
        <span>LA BONNE PIZZA</span><i>·</i><span>ALVALADE, LISBOA</span><i>·</i><span>{c.ticker}</span><i>·</i>
        <span>LA BONNE PIZZA</span><i>·</i><span>ALVALADE, LISBOA</span><i>·</i><span>{c.ticker}</span>
      </div>
    </div>
  );
}

function Hero({ language }: { language: Language }) {
  const c = ui[language];
  const a = assistive[language];
  const artStyle = { '--brand-mask': `url(${brandPizzaSlice})` } as CSSProperties;
  return (
    <section className="hero paper-grain" id="top" data-testid="section-hero">
      <span className="hero-brand-art" style={artStyle} aria-hidden="true" />
      <div className="hero-copy reveal">
        <p className="eyebrow"><span className="eyebrow-line" /> {c.heroEyebrow}</p>
        <h1>{c.heroTitle}<br /><em>{c.heroEmphasis}</em></h1>
        <p className="hero-intro">{c.heroIntro}</p>
        <div className="hero-actions">
          <a href="#menu" className="button button-primary" data-testid="link-hero-menu">{c.viewMenu} <ArrowDownRight size={18} /></a>
          <a href="#visita" className="text-link" data-testid="link-hero-visit">{c.visitUs} <ArrowDownRight size={17} /></a>
        </div>
      </div>
      <div className="hero-media reveal reveal-delay-2">
        <div className="media-frame">
          <img src={sitePhotos.hero} alt={a.heroAlt} data-testid="img-hero-pizza" />
          <span className="media-caption">{c.heroCaption}</span>
        </div>
      </div>
      <div className="hero-side-note"><span>01</span><span className="vertical-label">{c.sideNote}</span></div>
    </section>
  );
}

function Marquee({ language }: { language: Language }) {
  const c = ui[language];
  return (
    <div className="marquee-band" aria-label={c.marquee} data-testid="banner-manifesto">
      <div className="marquee-content"><span>{c.marquee}</span><span className="smile" aria-hidden="true" /><span>{c.marquee}</span></div>
    </div>
  );
}

function MenuSection({ language }: { language: Language }) {
  const [active, setActive] = useState<MenuGroup | 'bebidas'>('pizzas');
  const c = ui[language];
  const a = assistive[language];
  return (
    <section className="menu-section" id="menu" data-testid="section-menu">
      <div className="section-heading">
        <div>
          <p className="eyebrow"><span className="eyebrow-line" /> {c.menuEyebrow}</p>
          <h2>{c.menuTitle}<br /><em>{c.menuEmphasis}</em></h2>
        </div>
        <p className="section-aside">{c.menuAside}</p>
      </div>
      <div className="menu-layout">
        <div className="menu-image-stack">
          <img src={sitePhotos.menu} alt={a.menuAlt} data-testid="img-menu-pizza" />
          <div className="menu-image-note">{c.menuNote}</div>
        </div>
        <div className="menu-list-wrap">
          <div className="menu-tabs" aria-label={c.menuEyebrow}>
            {([['pizzas', c.menuTabs[0]], ['entradas', c.menuTabs[1]], ['doces', c.menuTabs[2]], ['bebidas', c.menuTabs[3]]] as const).map(([key, label]) => (
              <button key={key} type="button" aria-pressed={active === key} className={active === key ? 'active' : ''} onClick={() => setActive(key)} data-testid={`button-menu-${key}`}>{label}</button>
            ))}
          </div>
          <div className="menu-items" data-testid={`list-menu-${active}`}>
            {active === 'bebidas' ? (
              <div className="drinks-list menu-drinks-list" data-testid="list-drinks">
                {drinksMenu[language].map((group) => (
                  <div className="drinks-list-group" key={group.title}>
                    <h3>{group.title}</h3>
                    <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                ))}
              </div>
            ) : menuGroups[active].map((item, index) => (
                <div key={item.name}>
                  {item.group && <h3 className="menu-subheading">{item.group[language]}</h3>}
                  <article className="menu-item" data-testid={`menu-item-${active}-${index}`}>
                    <div className="menu-item-head"><h3>{item.name}</h3></div>
                    {item.detail[language] && <p>{item.detail[language]}</p>}
                    {item.marker && <span className="menu-marker">{item.marker}</span>}
                  </article>
                </div>
              ))}
          </div>
          <p className="menu-footnote">{c.allergy}</p>
        </div>
      </div>
    </section>
  );
}

function DrinksSection({ language }: { language: Language }) {
  const c = ui[language];
  const a = assistive[language];
  return (
    <section className="drinks-section" id="bebidas" data-testid="section-drinks">
      <div className="drinks-copy">
        <p className="eyebrow eyebrow-light"><span className="eyebrow-line" /> {c.drinksEyebrow}</p>
        <h2>{c.drinksTitle}<br /><em>{c.drinksEmphasis}</em></h2>
        <p>{c.drinksBody}</p>
        <a href="#contactos" className="button button-outline" data-testid="link-drinks-contact">{c.askList} <ArrowUpRight size={17} /></a>
      </div>
      <div className="drink-collage">
        <div className="drink-photo"><img src={sitePhotos.drinks} alt={a.drinksAlt} /></div>
      </div>
    </section>
  );
}

function StorySection({ language }: { language: Language }) {
  const c = ui[language];
  const a = assistive[language];
  return (
    <section className="story-section" id="historia" data-testid="section-story">
      <div className="story-index">02 <span>/ 04</span></div>
      <div className="story-copy">
        <p className="eyebrow"><span className="eyebrow-line" /> {c.storyEyebrow}</p>
        <h2>{c.storyTitle}<br /><em>{c.storyEmphasis}</em></h2>
        <p>{c.storyBodyOne}</p>
        <p>{c.storyBodyTwo}</p>
        <a href="#visita" className="text-link" data-testid="link-story-visit">{c.directions} <ArrowDownRight size={17} /></a>
      </div>
      <div className="story-visual">
        <img src={sitePhotos.story} alt={a.storyAlt} data-testid="img-story-dining" />
        <div className="story-quote">“{c.storyQuote}”</div>
      </div>
    </section>
  );
}

function VisitSection({ language }: { language: Language }) {
  const c = ui[language];
  return (
    <section className="visit-section" id="visita" data-testid="section-visit">
      <div className="visit-top">
        <p className="eyebrow"><span className="eyebrow-line" /> {c.visitEyebrow}</p>
        <h2>{c.visitTitle}<br /><em>{c.visitEmphasis}</em></h2>
        <p className="visit-lede">{c.visitLede}</p>
      </div>
      <div className="visit-grid">
        <div className="hours-card paper-grain">
          <Clock3 size={25} />
          <p className="card-label">{c.hoursLabel}</p>
          <div className="hours-row"><span>{c.daysOne}</span><strong>{language === 'en' ? '6PM — 10PM' : '18h — 22h'}</strong></div>
          <div className="hours-row"><span>{c.daysTwo}</span><strong>{language === 'en' ? '12PM — 10PM' : '12h — 22h'}</strong></div>
          <div className="hours-row muted-row"><span>{c.daysClosed}</span><strong>{c.closed}</strong></div>
          <p className="hours-note"><Dog size={15} /> {c.hoursNote}</p>
        </div>
        <div className="address-card">
          <div className="map-grid" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /></div>
          <div className="map-pin"><MapPin size={22} fill="currentColor" /></div>
          <div className="address-content"><p className="card-label">{c.location}</p><h3>Alvalade, Lisboa</h3><p>R. Luís Augusto Palmeirim 2A<br />1700-272 Lisboa</p><a href="https://maps.app.goo.gl/4HsUUMZ68Cunqxes6?g_st=ic" target="_blank" rel="noreferrer" className="text-link light-link" data-testid="link-directions">{c.openDirections} <ArrowUpRight size={17} /></a></div>
        </div>
      </div>
    </section>
  );
}

function SocialSection({ language }: { language: Language }) {
  const c = ui[language];
  const a = assistive[language];
  return (
    <section className="social-section" id="instagram" data-testid="section-social">
      <div className="social-heading">
        <div><p className="eyebrow"><span className="eyebrow-line" /> {c.socialEyebrow}</p><h2>{c.socialTitle}<br /><em>{c.socialEmphasis}</em></h2></div>
        <a href="https://www.instagram.com/labonnepizza.lx/" target="_blank" rel="noreferrer" className="social-handle" data-testid="link-instagram"><Instagram size={18} /> @labonnepizza.lx <ArrowUpRight size={15} /></a>
      </div>
      <div className="social-grid">
        {sitePhotos.social.map((photo, index) => (
          <a href="https://www.instagram.com/labonnepizza.lx/" target="_blank" rel="noreferrer" className="instagram-post" data-testid={`link-instagram-tile-${index + 1}`} key={photo}>
            <div className="instagram-post-head"><SmileMark /><span><strong>labonnepizza.lx</strong><small>Alvalade, Lisboa</small></span><b>•••</b></div>
            <img className="instagram-post-photo" src={photo} alt={`${a.socialPizzaAlt} ${index + 1}`} />
            <div className="instagram-post-actions"><Heart /><MessageCircle /><Send /><Bookmark className="save-icon" /></div>
            <div className="instagram-post-caption"><strong>labonnepizza.lx</strong> {index % 2 === 0 ? c.socialQuote : c.socialQuoteSmall}</div>
            <span className="instagram-view">{c.viewMore} no Instagram</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Footer({ language }: { language: Language }) {
  const c = ui[language];
  return (
    <footer className="site-footer paper-grain" id="contactos" data-testid="footer-contact">
      <div className="footer-main">
        <div className="footer-brand"><img className="footer-la-wordmark" src={brandWordmark} alt="Lá Bonne Pizza" /><p>{c.footerTagline}</p></div>
        <div className="footer-links"><p className="card-label">{c.contact}</p><a href="tel:+351960182559" data-testid="link-footer-phone">+351 960 182 559</a><a href="mailto:labonnepizza.lisboa@gmail.com" data-testid="link-footer-email">labonnepizza.lisboa@gmail.com</a><a href="https://www.instagram.com/labonnepizza.lx/" target="_blank" rel="noreferrer" data-testid="link-footer-instagram">@labonnepizza.lx <ArrowUpRight size={15} /></a></div>
        <div className="footer-hours"><p className="card-label">{c.comeBy}</p><p>{c.daysOne}<br /><strong>{language === 'en' ? '6PM — 10PM' : '18h — 22h'}</strong></p><p>{c.daysTwo}<br /><strong>{language === 'en' ? '12PM — 10PM' : '12h — 22h'}</strong></p><p>R. Luís Augusto Palmeirim 2A<br />Alvalade, Lisboa</p></div>
        <a className="back-top" href="#top" aria-label={c.backTop} data-testid="link-back-top"><ArrowUpRight size={22} /></a>
      </div>
      <div className="footer-bottom"><span>© 2026 La Bonne Pizza</span><span>{c.footerMade}</span><span>France × Portugal</span></div>
    </footer>
  );
}

function Home() {
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-PT' : language === 'fr' ? 'fr' : 'en';
  }, [language]);

  return (
    <main lang={language}>
      <TopTicker language={language} />
      <Nav language={language} onLanguageChange={setLanguage} />
      <Hero language={language} />
      <Marquee language={language} />
      <MenuSection language={language} />
      <DrinksSection language={language} />
      <StorySection language={language} />
      <VisitSection language={language} />
      <SocialSection language={language} />
      <Footer language={language} />
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;