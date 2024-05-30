import dynamic from "next/dynamic";

const Widget = dynamic(() => import("@/embedded/widget"), {
  ssr: false,
});

function DexifierWidget() {
  return <Widget />;
}

export default DexifierWidget;
