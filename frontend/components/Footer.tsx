export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">ABOUT</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
              <li><a href="#" className="hover:text-primary">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">HELP</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary">FAQ</a></li>
              <li><a href="#" className="hover:text-primary">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">LEGAL</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">DMCA</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">FOLLOW</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary">Twitter</a></li>
              <li><a href="#" className="hover:text-primary">Instagram</a></li>
              <li><a href="#" className="hover:text-primary">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 Comic Publishing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
