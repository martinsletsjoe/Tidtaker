import { useEffect, useRef, useState } from "react";
import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";

export default function Index() {
  const [repitisjons, setRepitisjons] = useState(0);
  const [number, setNumber] = useState(0);
  const direction = useRef(1);
  const [isCounting, setIsCounting] = useState(false);
  const intervalRefId = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    setIsCounting(true);
  };
  const stop = () => {
    setIsCounting(false);
    setRepitisjons(0);
    setNumber(0);
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
      intervalRefId.current = null;
    }
    return () => {
      if (intervalRefId.current !== null) {
        clearInterval(intervalRefId.current);
      }
    };
  }, [isCounting]);

  useEffect(() => {
    if (number === 5) {
      setRepitisjons(repitisjons + 1);
    }
  }, [number]);

  return (
    <View style={styles.timerContainer}>
      <View>
        <Text style={styles.number}>{number}</Text>
        <Text>{repitisjons}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Start" onPress={start} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Stop" onPress={stop} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  buttonWrapper: {
    marginHorizontal: 5, // Adjust the value to set the desired gap
  },
  number: {
    fontSize: 50,
  },
});
