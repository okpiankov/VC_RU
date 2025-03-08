import { Instagram, List } from "react-content-loader";

export const Skeleton1 = () => {
  return (
    <>
      <Instagram backgroundColor={"#1111"} />
      <Instagram backgroundColor={"#1111"} />
      <Instagram backgroundColor={"#1111"} />
    </>
  );
};

export const Skeleton2 = () => {
  return (
    <>
      <Instagram backgroundColor={"#1111"} />
      <List
        backgroundColor={"#1111"}
        width={640}
        height={620}
        viewBox="20 0 250 290"
      />
    </>
  );
};

// export const Skeleton3 = () => {
//   return (
//     <>
//       <Instagram backgroundColor={"#1111"} viewBox="0 0 380 200" />
//       <Instagram backgroundColor={"#1111"} />
//     </>
//   );
// };
