"use client";

import { useState, useEffect, useRef } from "react";

// Animated counter with editorial styling
function StatCounter({ value, label, suffix = "" }: { value: string; label: string; suffix?: string }) {
  return (
    <div className="border-l-2 border-neutral-200 pl-6 py-2 hover:border-accent-primary transition-colors duration-300">
      <div className="mono-accent text-3xl sm:text-4xl font-semibold text-foreground mb-1">
        {value}{suffix}
      </div>
      <div className="text-xs uppercase tracking-widest text-foreground-muted font-medium">
        {label}
      </div>
    </div>
  );
}

// Service provider badge
function ProviderBadge({ name, status }: { name: string; status: "active" | "beta" }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-neutral-200 bg-white">
      <span className={`w-1.5 h-1.5 rounded-full ${status === "active" ? "bg-accent-secondary" : "bg-accent-warm"}`} />
      <span className="text-sm font-medium text-foreground">{name}</span>
    </div>
  );
}

// Feature item with editorial styling
function FeatureItem({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="group py-8 border-b border-neutral-200 last:border-b-0">
      <div className="flex gap-6 sm:gap-8">
        <span className="text-4xl sm:text-5xl font-display italic text-accent-primary/30 group-hover:text-accent-primary transition-colors duration-300">
          {number}
        </span>
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 group-hover:text-accent-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-foreground-muted leading-relaxed max-w-md">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

// Terminal/code preview component
function CodePreview() {
  const [activeTab, setActiveTab] = useState(0);
  const codeSnippets = [
    {
      label: "OpenAI",
      code: `curl https://api.tokenai.dev/v1/chat/completions \\
  -H "Authorization: Bearer tk_ai_xxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{"model": "gpt-4", "messages": [{"role": "user", "content": "Hello"}]}'`
    },
    {
      label: "Claude",
      code: `curl https://api.tokenai.dev/v1/messages \\
  -H "Authorization: Bearer tk_ai_xxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{"model": "claude-3", "max_tokens": 1024, "messages": [...]}'`
    },
    {
      label: "Gemini",
      code: `curl https://api.tokenai.dev/v1/generate \\
  -H "Authorization: Bearer tk_ai_xxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{"model": "gemini-pro", "contents": [{"parts": [...]}]}'`
    }
  ];

  return (
    <div className="bg-neutral-900 rounded-sm overflow-hidden shadow-2xl">
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-800 border-b border-neutral-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>
        <div className="flex gap-1">
          {codeSnippets.map((snippet, idx) => (
            <button
              key={snippet.label}
              onClick={() => setActiveTab(idx)}
              className={`px-3 py-1 text-xs font-medium transition-colors ${
                activeTab === idx 
                  ? "bg-neutral-700 text-white" 
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {snippet.label}
            </button>
          ))}
        </div>
      </div>
      {/* Code content */}
      <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
        <pre className="text-green-400/90 whitespace-pre-wrap sm:whitespace-pre">
          <code>{codeSnippets[activeTab].code}</code>
        </pre>
      </div>
    </div>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || mobileMenuOpen ? "bg-background/95 backdrop-blur-sm border-b border-neutral-200" : ""}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-display font-bold tracking-tight">
                词元栈 <span className="text-accent-primary">TokenAI</span>
              </span>
            </div>
            
            {/* Desktop nav */}
            <div className="hidden sm:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors">功能</a>
              <a href="#pricing" className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors">定价</a>
              <a href="https://docs.tokenai.dev" className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors">文档</a>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="https://console.tokenai.dev/signup" className="btn-primary px-4 py-2 text-xs inline-block">
                开始使用
              </a>
              
              {/* Mobile menu button */}
              <button 
                className="sm:hidden p-2 -mr-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden py-4 border-t border-neutral-200">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-base font-medium text-foreground-muted hover:text-foreground transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>功能</a>
                <a href="#pricing" className="text-base font-medium text-foreground-muted hover:text-foreground transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>定价</a>
                <a href="https://docs.tokenai.dev" className="text-base font-medium text-foreground-muted hover:text-foreground transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>文档</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Asymmetric editorial layout */}
      <section className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left column - Main content */}
            <div className="lg:col-span-7 stagger-children">
              {/* Tag */}
              <div className="mb-8">
                <span className="tag">Developer Tool</span>
              </div>

              {/* Main headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-8 leading-none">
                One Token.
                <br />
                <span className="italic text-accent-primary">All AI Models.</span>
              </h1>

              {/* Subhead */}
              <p className="text-lg sm:text-xl text-foreground-muted max-w-lg mb-10 leading-relaxed">
                TokenAI 是面向开发者的 AI API 聚合中转站。一个密钥，无缝调用 OpenAI、Claude、Gemini 等主流大模型。
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a href="https://console.tokenai.dev/signup" className="btn-primary px-8 py-4 inline-block text-center">
                  免费开始
                </a>
                <a href="https://docs.tokenai.dev" className="btn-secondary px-8 py-4 flex items-center justify-center gap-2">
                  <span>查看文档</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8 sm:gap-12">
                <StatCounter value="50M+" label="API 调用/月" />
                <StatCounter value="99.9" label="可用性 %" suffix="%" />
                <StatCounter value="&lt;100" label="延迟 ms" />
              </div>
            </div>

            {/* Right column - Code preview */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border border-accent-primary/20 rounded-full" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent-warm/10" />
                
                <CodePreview />
                
                {/* Caption */}
                <p className="mt-4 text-xs text-foreground-muted italic text-center">
                  统一接口，原生兼容各平台 SDK
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Providers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-neutral-200 bg-background-warm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground-muted">
              支持的平台
            </h2>
            <a href="https://tokenai.dev/providers" className="text-sm text-accent-primary hover:underline">
              查看全部 15+ 平台 →
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            <ProviderBadge name="OpenAI" status="active" />
            <ProviderBadge name="Anthropic" status="active" />
            <ProviderBadge name="Google Gemini" status="active" />
            <ProviderBadge name="Azure OpenAI" status="active" />
            <ProviderBadge name="Cohere" status="active" />
            <ProviderBadge name="Mistral" status="beta" />
            <ProviderBadge name="AI21 Labs" status="beta" />
            <ProviderBadge name="Stability AI" status="beta" />
          </div>
        </div>
      </section>

      {/* Features - Editorial list style */}
      <section id="features" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Left sticky header */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <span className="tag mb-4">Features</span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                  为什么开发者选择 TokenAI
                </h2>
                <p className="text-foreground-muted mb-8">
                  我们专注于解决开发者在对接多平台 AI API 时的痛点。
                </p>
                <hr className="accent-rule" />
              </div>
            </div>

            {/* Right feature list */}
            <div className="lg:col-span-8">
              <FeatureItem
                number="01"
                title="统一接口标准"
                description="告别对接不同 API 规范的繁琐。TokenAI 提供 OpenAI-compatible 接口，一行代码切换底层模型。"
              />
              <FeatureItem
                number="02"
                title="智能负载均衡"
                description="自动故障转移和请求路由。当某个服务商限流或故障时，无缝切换至备用渠道，保障业务连续性。"
              />
              <FeatureItem
                number="03"
                title="用量透明计费"
                description="实时查看各模型调用次数、Token 消耗和费用明细。支持设置用量预警和自动限额。"
              />
              <FeatureItem
                number="04"
                title="企业级安全"
                description="密钥加密存储，支持 IP 白名单、请求签名验证和审计日志。SOC 2 Type II 认证进行中。"
              />
              <FeatureItem
                number="05"
                title="边缘加速节点"
                description="全球 12 个 PoP 节点，智能路由至最近接入点。香港、新加坡、东京、硅谷等地均有部署。"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works - Visual diagram */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-background-warm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="tag mb-4">How it works</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">
              三步开始调用
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 sm:gap-4">
            {[
              { step: "1", title: "注册账号", desc: "邮箱验证，即刻开通，无需绑定信用卡" },
              { step: "2", title: "创建密钥", desc: "在控制台生成 API Key，支持多项目隔离" },
              { step: "3", title: "开始调用", desc: "替换 base URL 和 API Key，无需修改业务代码" }
            ].map((item, idx) => (
              <div key={idx} className="relative text-center px-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 flex items-center justify-center border-2 border-foreground text-lg sm:text-xl font-display font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-foreground-muted">{item.desc}</p>
                {idx < 2 && (
                  <div className="hidden sm:block absolute top-7 sm:top-8 left-full w-full h-px bg-neutral-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section id="pricing" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="tag mb-4">Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
            透明的按需付费
          </h2>
          <p className="text-lg text-foreground-muted mb-10 max-w-2xl mx-auto">
            无最低消费，无隐藏费用。按实际调用量付费，价格与官方持平或更低。
          </p>
          
          <div className="inline-flex flex-col sm:flex-row items-stretch gap-0 bg-white border border-neutral-200 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
            <div className="px-8 py-4 text-center sm:text-left">
              <div className="text-xs uppercase tracking-widest text-foreground-muted mb-1">Free</div>
              <div className="text-2xl font-semibold">¥0</div>
              <div className="text-xs text-foreground-muted">包含 ¥10 试用金</div>
            </div>
            <div className="w-px bg-neutral-200 hidden sm:block" />
            <div className="px-8 py-4 text-center sm:text-left border-l-2 border-accent-primary bg-neutral-50">
              <div className="text-xs uppercase tracking-widest text-accent-primary mb-1">Pay as you go</div>
              <div className="text-2xl font-semibold">按量付费</div>
              <div className="text-xs text-foreground-muted">充值后自动抵扣</div>
            </div>
            <div className="w-px bg-neutral-200 hidden sm:block" />
            <div className="px-8 py-4 text-center sm:text-left">
              <div className="text-xs uppercase tracking-widest text-foreground-muted mb-1">Enterprise</div>
              <div className="text-2xl font-semibold">定制</div>
              <div className="text-xs text-foreground-muted">专属技术支持</div>
            </div>
          </div>

          <p className="mt-8 text-sm text-foreground-muted">
            新用户注册即送 ¥10 试用金，无需绑定支付方式
          </p>
        </div>
      </section>

      {/* Testimonial / Quote */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="quote-mark absolute -top-8 -left-4">"</div>
            <blockquote className="relative z-10 text-2xl sm:text-3xl font-display leading-relaxed mb-8">
              从需要维护 8 个不同的 API 密钥，到只需要一个 TokenAI Key。我们的运维复杂度降低了 70%，
              <span className="text-accent-primary">而调用稳定性反而更高了</span>。
            </blockquote>
            <footer className="flex items-center gap-4">
              <div className="w-12 h-12 bg-neutral-700 rounded-full" />
              <div>
                <div className="font-semibold">伊涅芙</div>
              </div>
            </footer>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            准备好简化你的
            <span className="italic text-accent-primary"> AI 接入</span>了吗？
          </h2>
          <p className="text-lg text-foreground-muted mb-10">
            加入 10,000+ 开发者，使用 TokenAI 统一管理 AI API
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://console.tokenai.dev/signup" className="btn-primary px-10 py-4 text-base inline-block text-center">
              免费开始
            </a>
            <a href="https://tokenai.dev/contact" className="btn-secondary px-10 py-4 text-base inline-block text-center">
              联系销售
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-xl font-display font-bold mb-4">
                词元栈 <span className="text-accent-primary">TokenAI</span>
              </div>
              <p className="text-sm text-foreground-muted">
                统一的 AI API 聚合平台，让开发者专注于创造价值。
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">产品</h4>
              <ul className="space-y-2 text-sm text-foreground-muted">
                <li><a href="https://tokenai.dev/features" className="hover:text-foreground transition-colors">功能特性</a></li>
                <li><a href="https://tokenai.dev/pricing" className="hover:text-foreground transition-colors">定价方案</a></li>
                <li><a href="https://tokenai.dev/providers" className="hover:text-foreground transition-colors">支持的平台</a></li>
                <li><a href="https://status.tokenai.dev" className="hover:text-foreground transition-colors">状态页面</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">开发者</h4>
              <ul className="space-y-2 text-sm text-foreground-muted">
                <li><a href="https://docs.tokenai.dev" className="hover:text-foreground transition-colors">API 文档</a></li>
                <li><a href="https://tokenai.dev/sdk" className="hover:text-foreground transition-colors">SDK 下载</a></li>
                <li><a href="https://docs.tokenai.dev/examples" className="hover:text-foreground transition-colors">示例代码</a></li>
                <li><a href="https://tokenai.dev/changelog" className="hover:text-foreground transition-colors">更新日志</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">公司</h4>
              <ul className="space-y-2 text-sm text-foreground-muted">
                <li><a href="https://tokenai.dev/about" className="hover:text-foreground transition-colors">关于我们</a></li>
                <li><a href="https://tokenai.dev/blog" className="hover:text-foreground transition-colors">博客</a></li>
                <li><a href="https://tokenai.dev/careers" className="hover:text-foreground transition-colors">加入我们</a></li>
                <li><a href="https://tokenai.dev/contact" className="hover:text-foreground transition-colors">联系方式</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-foreground-muted">
              © {new Date().getFullYear()} TokenAI. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-foreground-muted">
              <a href="https://tokenai.dev/privacy" className="hover:text-foreground transition-colors">隐私政策</a>
              <a href="https://tokenai.dev/terms" className="hover:text-foreground transition-colors">服务条款</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
