import { useState, useEffect } from "react"

//functions
export const useArrayInterval = (lines: string[]): string => {

  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {

      const amountOfLines = lines.length - 1

      setLineCount((lineCount) =>
        lineCount === amountOfLines ? 0 : lineCount + 1
      );
    }, 3000)

    return () => clearInterval(interval);
  }, [lineCount]);

  return lines[lineCount]
}