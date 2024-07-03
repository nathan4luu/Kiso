import { useEffect } from "react";

export function LoginSuccess() {
  useEffect(() => {
    setTimeout(() => {
        window.opener.postMessage('authenticated', 'http://localhost:3000')
      window.close();
    }, 1250);
  }, []);
  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      <div className="items-center">
        <p> One step closer to studying with </p>
        <p></p>
        <div className="flex row">
          <p className="font-shojumaru self-center text-purple-800"> Kiso</p>
          <p>...</p>
        </div>
      </div>
    </div>
  );

}
