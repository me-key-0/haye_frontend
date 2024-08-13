

const Footer = () => {
  return (
    <section className="py-10 bg-gray-900 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 text-white md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Press
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Support
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Community
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Developers
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  GDPR
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex mt-4 space-x-4">
              <a href="https://twitter.com" className="text-blue-400 hover:text-blue-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.954 4.569c-.885.392-1.83.654-2.825.775 1.014-.609 1.794-1.574 2.163-2.724-.951.555-2.005.959-3.127 1.184-.897-.956-2.178-1.555-3.594-1.555-2.717 0-4.924 2.208-4.924 4.924 0 .39.045.765.127 1.125-4.094-.205-7.725-2.166-10.155-5.144-.424.727-.666 1.572-.666 2.475 0 1.708.869 3.216 2.188 4.1-.807-.026-1.566-.247-2.229-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.112-.847.171-1.296.171-.314 0-.621-.03-.917-.086.622 1.943 2.431 3.357 4.576 3.397-1.674 1.313-3.78 2.098-6.065 2.098-.394 0-.781-.023-1.17-.067 2.163 1.386 4.736 2.192 7.507 2.192 9.009 0 13.939-7.462 13.939-13.94 0-.213-.004-.426-.013-.637.961-.693 1.8-1.562 2.46-2.549z" />
                </svg>
              </a>
              <a href="https://facebook.com" className="text-blue-600 hover:text-blue-800">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.676 0h-21.353c-.732 0-1.324.592-1.324 1.324v21.351c0 .733.591 1.325 1.324 1.325h11.491v-9.264h-3.105v-3.621h3.105v-2.672c0-3.072 1.875-4.745 4.607-4.745 1.311 0 2.435.097 2.762.141v3.205h-1.896c-1.487 0-1.775.707-1.775 1.744v2.317h3.548l-.462 3.621h-3.086v9.264h6.053c.733 0 1.325-.591 1.325-1.324v-21.351c-.001-.733-.592-1.324-1.325-1.324z" />
                </svg>
              </a>
              <a href="https://linkedin.com" className="text-blue-500 hover:text-blue-700">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.23 0h-20.461c-.973 0-1.769.795-1.769 1.769v20.461c0 .974.795 1.769 1.769 1.769h20.461c.973 0 1.769-.795 1.769-1.769v-20.461c0-.974-.796-1.769-1.769-1.769zm-13.538 20.461h-3.076v-10.769h3.076v10.769zm-1.538-12.308c-.974 0-1.769-.795-1.769-1.769s.795-1.769 1.769-1.769 1.769.795 1.769 1.769-.795 1.769-1.769 1.769zm14.307 12.308h-3.077v-5.385c0-1.282-.026-2.923-1.782-2.923-1.782 0-2.055 1.39-2.055 2.826v5.482h-3.077v-10.769h2.949v1.475h.041c.411-.772 1.414-1.586 2.914-1.586 3.112 0 3.684 2.048 3.684 4.71v6.171z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
