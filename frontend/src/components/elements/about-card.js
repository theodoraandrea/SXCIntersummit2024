export default function AboutCard({ logo, children, header }) {
  return (
    <div className="bg-white text-black rounded-lg shadow-lg max-w-lg mx-4 mb-8 md:mb-0 p-6">
      <img src={logo} alt="StudentxCEOs Jakarta" className="mx-auto mb-4" />
      <h1 className="text-3xl font-bold py-2 text-primary-1">{header}</h1>
      <p className="text-lg">{children}</p>
    </div>
  );
}
