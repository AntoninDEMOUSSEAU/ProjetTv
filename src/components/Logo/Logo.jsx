import s from "./style.module.css";
function Logo({ image, title, subTitles }) {
  return (
    <>
      <div className={s.container}>
        <img src={image} className={s.img} />
        <span className={s.title}>{title}</span>
      </div>
      <span className={s.subTitles}>{subTitles}</span>
    </>
  );
}

export default Logo;
