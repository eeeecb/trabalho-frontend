export default function Footer() {
    return (
      <footer className="bg-gray-800 border-t border-gray-700 p-4 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Eduardo Barbosa - Todos os direitos reservados
        </p>
      </footer>
    );
  }
  