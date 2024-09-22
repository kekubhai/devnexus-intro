const ContactForm = () => (
    <form className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input type="email" className="w-full p-2  rounded-md" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Message</label>
        <textarea className="w-full p-2  rounded-md" rows={4}></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Submit</button>
    </form>
  );
  
  export default ContactForm;
  