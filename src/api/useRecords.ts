import { DocumentPickerResponse } from 'react-native-document-picker';
import { useMutation, useQuery } from 'react-query';

import { privateApi } from './Base';

const fetchRecords = async () => {
  try {
    const { data } = await privateApi.get("/records");
    return data;
  } catch (error: any) {
    console.log(error);
  }
};

const fetchRecord = async (id: string) => {
  try {
    const { data } = await privateApi.get(`/records/${id}`);
    return data;
  } catch (error: any) {
    console.log(error);
  }
};

const useRecords = () => {
  const { isLoading, error, data, isError } = useQuery({
    queryKey: "records",
    queryFn: fetchRecords,
  });

  return { isLoading, error, records: data, isError };
};

const useRecord = (id: string) => {
  const { isLoading, error, data, isError } = useQuery({
    queryKey: ["record", id],
    queryFn: () => fetchRecord(id),
  });

  return { isLoading, error, record: data, isError };
};

//upload multiple files
const useAddRecord = (callb?: () => void) => {
  const addRecordMutation = useMutation(
    async ({
      files,
      otherData,
    }: {
      files: DocumentPickerResponse[];
      otherData: {
        title: string;
        description: string;
        type: string;
      };
    }) => {
      const formData = new FormData();

      for (const file of files) {
        formData.append("files", {
          uri: file.uri,
          type: file.type,
          name: file.name,
        } as any);
      }

      formData.append("title", otherData.title);
      formData.append("description", otherData.description);
      formData.append("type", otherData.type);

      const response = await privateApi.post("/records", formData);
      return response.data; // Return the response data
    },
    {
      onSuccess: callb ? callb : () => {},
    }
  );

  return addRecordMutation;
};

export { useRecords, useRecord, useAddRecord };
