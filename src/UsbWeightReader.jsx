import React, { useState } from "react";

const SerialWeightReader = () => {
  const [weight, setWeight] = useState(null);

  const connectToSerialDevice = async () => {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    const reader = port.readable.getReader();

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      const weightData = new TextDecoder().decode(value);
      setWeight(weightData.trim());
    }

    reader.releaseLock();
  };

  return (
    <div>
      <button onClick={connectToSerialDevice}>connect+</button>
      <h1>{weight ? weight : "الوزن غير متوفر حاليًا"}</h1>
    </div>
  );
};

export default SerialWeightReader;
