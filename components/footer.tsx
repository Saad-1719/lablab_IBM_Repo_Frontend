"use client"

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="animate-fade-in-up">
            <h3 className="font-bold text-xl mb-4">Agent Hub</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Intelligent orchestration agent platform designed to transform procurement operations and drive
              efficiency.
            </p>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h4 className="font-bold text-lg mb-4">Features</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Smart Automation
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Advanced Analytics
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Real-time Monitoring
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Secure Integration
                </a>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h4 className="font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-sm opacity-90 mb-2">&copy; 2025 Agent Hub. All rights reserved.</p>
          <p className="text-xs opacity-75">
            Powered by intelligent orchestration technology | Trusted by leading organizations worldwide
          </p>
        </div>
      </div>
    </footer>
  )
}
