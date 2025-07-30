function Footer() {
  return (
    <footer className="bg-[#0f172a] text-center text-sm text-blue-200 border-t border-white/10 mt-12 py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        {/* Project Info */}
        <div>
          <h4 className="font-semibold text-white mb-2">SecureQuery</h4>
          <p>
            Built with ❤️ for Hackathons <br />
            © {new Date().getFullYear()} SecureQuery
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="font-semibold text-white mb-2">Resources</h4>
          <ul className="space-y-1">
            <li>
              <a href="/docs" className="hover:underline">
                Documentation
              </a>
            </li>
            <li>
              <a href="https://github.com/yourrepo" target="_blank" className="hover:underline">
                GitHub
              </a>
            </li>
            <li>
              <a href="/demo" className="hover:underline">
                Demo
              </a>
            </li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div>
          <h4 className="font-semibold text-white mb-2">Disclaimer</h4>
          <p className="text-xs text-blue-300">
            This project is a proof-of-concept for hackathons. Do not use in production without security reviews and RBAC audit.
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-6 text-blue-400 text-xs">
        Made using React, TailwindCSS, ThreeJS, GSAP & Azure OpenAI
      </div>
    </footer>
  );
}

export default Footer;
