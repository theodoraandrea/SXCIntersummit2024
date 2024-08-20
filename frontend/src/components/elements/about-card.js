export default function AboutCard({ logo, children, header }) {
  return (
    <div className="bg-primary-4 text-white rounded-xl shadow-lg max-w-lg mx-4 mb-8 md:mb-0 p-6">
      <img src={logo} alt="StudentxCEOs Jakarta" className="mx-auto mb-4" />
      <h1 className="text-3xl font-bold py-2 text-white">{header}</h1>
      <p className="text-lg">{children}</p>
    </div>
  );
}
