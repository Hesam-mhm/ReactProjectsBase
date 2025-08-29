import { useEffect, useState } from 'react';
import { generateDocumentNumber } from '../helper/GeneralFunctions';

export function useGenerateDocumentNumber<T>(dataSource: T[] | undefined, fieldKey: keyof T) {
  const [generatedNumber, setGeneratedNumber] = useState('');

  useEffect(() => {
    if (dataSource && fieldKey) {
      setGeneratedNumber(generateDocumentNumber(dataSource, fieldKey as string));
    }
  }, [dataSource, fieldKey]);

  return generatedNumber;
}
