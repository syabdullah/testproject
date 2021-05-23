import { useEffect } from "react";
import { registerAlibaba } from "newDropshipperApp/module/alibaba";
import { StringParam, useQueryParam } from "use-query-params";

const AlibabaRegister = () => {
  const [alibabaToken] = useQueryParam("alibaba_token", StringParam);
  useEffect(() => {
    async function redirectToAlibaba() {
      const url = await registerAlibaba(alibabaToken);
      window.location.replace(url);
    }
    redirectToAlibaba();
  }, []);

  return "";
};

export default AlibabaRegister;



// WEBPACK FOOTER //
// ./src/components/AlibabaRegister.js