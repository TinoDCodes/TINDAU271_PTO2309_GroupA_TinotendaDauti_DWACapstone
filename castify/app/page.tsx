import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image
        src="/assets/castify-logo-dark.png"
        alt="Castify logo"
        height={20}
        width={150}
      />
    </div>
  );
}
