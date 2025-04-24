import { Contact } from 'lucide-react';
import qrContactImg from "@/assets/svg/WhatsappContact.svg"; // usa @ si tienes alias configurado


<div className="flex justify-center mb-4">
  <img src={qrContactImg} alt="QR contacto ERP" className="w-44 h-44" />
</div>


const CardWhatsapp = () => (
  <div className="max-w-md mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
    <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
      Contáctanos con QR
    </h2>
    <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-4">
      Escanee el código QR para más información del ERP.
    </p>

    <div className="flex justify-center mb-4">
      <img
        src={qrContactImg}
        alt="QR contacto ERP"
        className="w-44 h-44"
      />
    </div>

    <div className="flex justify-center items-center space-x-2 mt-4">
      <Contact className="text-green-500 text-2xl" />
      <span className="text-sm text-gray-700 dark:text-gray-200">
        Escríbenos al{' '}
        <a
          href="https://wa.me/593963791150"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          WhatsApp
        </a>
      </span>
    </div>
  </div>
);

export default CardWhatsapp;
