import React, { useEffect } from "react";

const ImportScript = (resourceUrl) => {
  useEffect(() => {
    resourceUrl.map((url) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    });
  }, []);
  return <div>ImportScript</div>;
};
// const ImportScripts = (resourceUrls) => {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = resourceUrls;
//     script.async = true;
//     document.body.appendChild(script);
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, [resourceUrls]);
//   return <div>ImportScript</div>;
// };
export default ImportScript;
// export { ImportScripts };
