const ContactSection = () => {
  return (
    <section id="contacto" className="p-8 bg-pblue text-white text-center font-daysone">
      <h2 className="text-5xl mb-4">¡No dudes en escribirnos!</h2>
      <p className="text-m mb-4">
        Consultanos cual es la fecha del próximo torneo
      </p>
      <div className="relative flex justify-between items-center px-4 py-2 w-full">
        <button className="absolute left-1/2 transform -translate-x-1/2 px-5 py-2 bg-pgreen text-white rounded-lg font-medium font-poppins">
          CONTACTO
        </button>
        <button className="px-5 py-2 bg-pgreen text-white rounded-lg font-medium ml-auto font-poppins">
          ADMINISTRACION
        </button>
      </div>
    </section>
  );
};

export default ContactSection;
