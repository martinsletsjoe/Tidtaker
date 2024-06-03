import { useEffect, useRef, useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const [number, setNumber] = useState(0);
  const direction = useRef(1);
  const [isCounting, setIsCounting] = useState(false);
  const intervalRefId = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    setIsCounting(true);
  };
  const stop = () => {
    setIsCounting(false);
  };

  useEffect(() => {
    if (isCounting) {
      intervalRefId.current = setInterval(() => {
        setNumber((prevCount) => {
          if (prevCount === 5) direction.current = -1;
          if (prevCount === 0) direction.current = 1;
          return prevCount + direction.current;
        });
      }, 1000);
    } else if (intervalRefId.current !== null) {
      clearInterval(intervalRefId.current);
      intervalRefId.current = null; // Reset intervalRef to null after clearing
    }
    // Cleanup interval on component unmount
    return () => {
      if (intervalRefId.current !== null) {
        clearInterval(intervalRefId.current);
      }
    };
  }, [isCounting]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Start" onPress={start} />
      <Button title="Stop" onPress={stop} />
      <Text>{number}</Text>
    </View>
  );
}
