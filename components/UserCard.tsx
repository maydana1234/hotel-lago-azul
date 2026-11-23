import Image from "next/image";
import DataUsers from "./DataUsers";
import ButtonSection from "./ButtonSection";
import "./userCard.css";

export default function UserCard() {
  return (
    <article className="user-card">
      <Image
        className="user-card__avatar"
        src="/avatar-jessica.jpeg"
        alt="Jessica Randall"
        width={88}
        height={88}
        priority
      />
      <DataUsers />
      <ButtonSection />
    </article>
  );
}