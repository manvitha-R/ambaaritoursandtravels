import { useState, useEffect } from "react";

export default function EnquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "", email: "", mobile: "",
    date: "", travellers: "", destination: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.mobile || !form.destination) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setLoading(true);
    console.log("TENANT:", process.env.TENANT_ID);
console.log("CLIENT:", process.env.CLIENT_ID);
console.log("SECRET:", process.env.CLIENT_SECRET);
console.log("EMAIL:", process.env.SENDER_EMAIL);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } 
    catch {
      setError("Network error. Please try again.");
    } 
    
    finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl">

        {/* Header */}
        <div className="bg-amber-500 rounded-t-xl p-4 flex items-center justify-between">
          <div>
            <h2 className="text-white text-xl font-bold">Send us a Query</h2>
            <p className="text-white/90 text-sm">
              Ready to explore the world? Fill the form and start your journey!
            </p>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-black text-2xl font-bold hover:opacity-75">
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-gray-800">Enquiry Sent!</h3>
            <p className="text-gray-500 mt-2">We'll get back to you shortly.</p>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 bg-amber-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-600"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="p-6 grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-black">Name*</label>
              <input name="name" onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1 text-black" placeholder="Enter your full name" />
            </div>
            <div>
              <label className="text-sm font-medium text-black">Email</label>
              <input name="email" onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1 text-black" placeholder="Enter your email" />
            </div>
            <div>
              <label className="text-sm font-medium text-black">Mobile*</label>
              <input name="mobile" onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1 text-black" placeholder="Enter mobile number" />
            </div>
            <div>
              <label className="text-sm font-medium text-black">Travel Date*</label>
              <input type="date" name="date" onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1 text-black" />
            </div>
            <div>
              <label className="text-sm font-medium text-black">No. of Travellers</label>
              <input type="number" name="travellers" onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1 text-black" placeholder="e.g. 2" />
            </div>
            <div>
              <label className="text-sm font-medium text-black">Destination*</label>
              <input name="destination" onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1 text-black" placeholder="e.g. Bali, Indonesia" />
            </div>

            {error && (
              <div className="col-span-2 text-red-500 text-sm text-center">{error}</div>
            )}

            <div className="col-span-2">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg disabled:opacity-60"
              >
                {loading ? "Sending..." : "Submit Enquiry"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}