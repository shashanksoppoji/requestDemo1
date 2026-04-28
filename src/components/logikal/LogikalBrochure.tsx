import { LogikalRequestForm } from "./LogikalRequestForm";

export function LogikalBrochure() {
  return (
    <div className="logikal-brochure">
      <nav>
        <div className="nav-logo">
          <div className="nav-logo-dot" />
          LogiKal.ai / Control Tower
        </div>
        <a href="#contact" className="nav-cta">
          Request demo
        </a>
      </nav>

      <section className="hero">
        <div className="hero-grid" aria-hidden />
        <h1 className="fade-up d1">
          Your AI-powered <strong>Control Tower</strong> for chemical supply chains
        </h1>
        <p className="hero-sub fade-up d2">
          Real-time visibility. Intelligent workflows. Actionable insights. All in one
          platform — purpose-built for chemical operations.
        </p>
        <div className="hero-actions fade-up d3">
          <a href="#contact" className="btn-primary">
            Request a demo
          </a>
          <a href="#capabilities" className="btn-ghost">
            See capabilities
          </a>
        </div>
      </section>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-num">40%</span>
          <span className="stat-label">Reduction in supply disruptions</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">3×</span>
          <span className="stat-label">Faster incident response</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">98%</span>
          <span className="stat-label">Compliance audit accuracy</span>
        </div>
      </div>

      <div className="section" id="about">
        <div className="section-tag">About LogiKal.ai</div>
        <h2>The operating system for chemical supply chains</h2>
        <p className="section-body">
          LogiKal.ai&apos;s Control Tower unifies procurement, production, logistics, and
          compliance into a single AI-powered command centre — giving your operations teams
          the visibility, foresight, and fulfillment they need to stay ahead.
        </p>
        <div className="about-grid">
          <div className="about-card">
            <div className="about-card-icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M7 1.5C4 1.5 1.5 4 1.5 7S4 12.5 7 12.5 12.5 10 12.5 7 10 1.5 7 1.5Z"
                  stroke="#EC6335"
                  strokeWidth="1.1"
                />
                <path
                  d="M7 4.5V7.5L9 9"
                  stroke="#EC6335"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3>Built for chemicals</h3>
            <p>
              REACH, GHS, and HSDA compliance frameworks built-in. We understand the
              regulatory precision unique to chemical industries.
            </p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M2 10 L5 7 L8 9 L12 3"
                  stroke="#EC6335"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>AI-native platform</h3>
            <p>
              Not retrofitted analytics — a ground-up AI architecture that learns your
              supply chain patterns and continuously improves predictions.
            </p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <rect
                  x="2"
                  y="2"
                  width="4"
                  height="4"
                  rx="1"
                  stroke="#EC6335"
                  strokeWidth="1.1"
                />
                <rect
                  x="8"
                  y="2"
                  width="4"
                  height="4"
                  rx="1"
                  stroke="#EC6335"
                  strokeWidth="1.1"
                />
                <rect
                  x="2"
                  y="8"
                  width="4"
                  height="4"
                  rx="1"
                  stroke="#EC6335"
                  strokeWidth="1.1"
                />
                <rect
                  x="8"
                  y="8"
                  width="4"
                  height="4"
                  rx="1"
                  stroke="#EC6335"
                  strokeWidth="1.1"
                />
              </svg>
            </div>
            <h3>Fast to deploy</h3>
            <p>
              Native connectors for SAP, Oracle, and Microsoft Dynamics. Go live in weeks
              with your existing ERP data flowing from day one.
            </p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M7 1.5L8.8 5H12L9.5 7.2L10.4 10.5L7 8.5L3.6 10.5L4.5 7.2L2 5H5.2L7 1.5Z"
                  stroke="#EC6335"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>Enterprise-grade</h3>
            <p>
              ISO/IEC 27001 certified. On-prem and cloud options with dedicated
              implementation support for global operations.
            </p>
          </div>
        </div>
      </div>

      <div className="caps-bg" id="capabilities">
        <div className="section">
          <div className="section-tag">Key capabilities</div>
          <h2>Everything in one command centre</h2>
          <p className="section-body">
            From raw material sourcing to last-mile delivery — Control Tower gives your
            teams the data, predictions, and actions to operate at full intelligence.
          </p>
          <div className="caps-grid">
            <div className="cap-item">
              <div className="cap-accent" />
              <div className="cap-num">01</div>
              <h3>Real-time visibility</h3>
              <p>
                Live tracking across every node — from Tier 2 suppliers to end customers —
                in a single unified view.
              </p>
            </div>
            <div className="cap-item">
              <div className="cap-accent" />
              <div className="cap-num">02</div>
              <h3>Predictive analytics</h3>
              <p>
                AI models that flag demand shifts, supplier risks, and price volatility
                before they impact your operations.
              </p>
            </div>
            <div className="cap-item">
              <div className="cap-accent" />
              <div className="cap-num">03</div>
              <h3>Compliance automation</h3>
              <p>
                Built-in REACH, GHS, and HSDA frameworks with automated, audit-ready
                reporting at all times.
              </p>
            </div>
            <div className="cap-item">
              <div className="cap-accent" />
              <div className="cap-num">04</div>
              <h3>Autonomous decisions</h3>
              <p>
                Configurable AI agents that resolve routine exceptions without human
                intervention — freeing your team for higher-value work.
              </p>
            </div>
            <div className="cap-item">
              <div className="cap-accent" />
              <div className="cap-num">05</div>
              <h3>ERP integrations</h3>
              <p>
                Native connectors for SAP, Oracle, and Dynamics 365. Your data, unified,
                from the moment you go live.
              </p>
            </div>
            <div className="cap-item">
              <div className="cap-accent" />
              <div className="cap-num">06</div>
              <h3>Collaborative workspace</h3>
              <p>
                Shared dashboards and alerts for procurement, logistics, and plant teams
                — eliminating silos across your organisation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-wrap" id="contact">
        <div className="contact-inner">
          <div className="section-tag">Connect with us</div>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              color: "var(--white)",
              marginBottom: "0.75rem",
            }}
          >
            Request a demo
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "var(--white-3)",
              lineHeight: 1.75,
              marginBottom: 0,
            }}
          >
            Drop your details and our team will reach out to you shortly.
          </p>
          <LogikalRequestForm />
        </div>
      </div>

      <footer>
        <p>
          © 2026 LogiKal.ai &nbsp;·&nbsp;{" "}
          <a href="https://logikal.ai" target="_blank" rel="noopener noreferrer">
            logikal.ai
          </a>{" "}
          &nbsp;·&nbsp; logikal.ai
        </p>
      </footer>
    </div>
  );
}
