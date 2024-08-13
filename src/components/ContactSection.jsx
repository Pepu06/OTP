const ContactSection = () => {
  return (
    <section id="contacto" className="p-8 bg-pblue text-white text-center font-daysone">
      <h2 className="text-xl sm:text-5xl mb-4 font-extralight">¡No dudes en escribirnos!</h2>
      <p className="text-sm sm:text-base mb-4">
        Consultanos la fecha del próximo torneo
      </p>
      <div className="relative flex justify-between items-center px-4 py-8 w-full">
        <a href="https://wa.me/1140962011" className="px-5 py-2 bg-pgreen text-white rounded-lg font-medium font-poppins mb-2">
          CONTACTO
        </a>
      </div>
    </section>
  );
};

export default ContactSection;