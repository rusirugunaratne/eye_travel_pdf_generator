import { onValue, ref } from "firebase/database";
import { db } from "./firebase";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import etlogo from "./etlogo.png";
import ReactPDF, {
  Document,
  Font,
  Image,
  PDFDownloadLink,
  Page,
  StyleSheet,
  Text,
} from "@react-pdf/renderer";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    marginLeft: 5,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

function PdfGenerator() {
  const [paymentData, setPaymentData] = useState({
    address: "address",
    amount: 0,
    contactNumber: "contactNo",
    email: "email",
    firstName: "first name",
    guideId: "guide id",
    guideName: "guide name",
    lastName: "last name",
    paymentId: "payment id",
    placesToVisit: "places to visit",
  });

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setInputValue(event.target.value);
  };

  const generatePdf = () => {
    const paymentRef = ref(db, "Payments/" + inputValue);
    onValue(paymentRef, (snapshot) => {
      const data = snapshot.val();
      setPaymentData(data);
      console.log(data);
    });
  };

  const Pdf = () => (
    <Document>
      <Page size='A4' style={styles.page}>
        <Text style={styles.header} fixed>
          ~ EyeTravel Online Payments ~
        </Text>
        <Text style={styles.author}>Payment For</Text>
        <Text style={styles.title}>
          {" "}
          {paymentData.guideName + " " + paymentData.guideId}{" "}
        </Text>
        <Image style={styles.image} src={etlogo} />
        <Text style={styles.subtitle}>
          Payers Name : {paymentData.firstName + " " + paymentData.lastName}
        </Text>
        <Text style={styles.subtitle}>
          Payers Address : {paymentData.address}
        </Text>
        <Text style={styles.subtitle}>Payers Email : {paymentData.email}</Text>
        <Text style={styles.subtitle}>
          Payers Contact Number : {paymentData.contactNumber}
        </Text>
        <Text style={styles.subtitle}>
          Places to Visit : {paymentData.placesToVisit}
        </Text>

        <Text style={styles.title}>Amount : LKR {paymentData.amount} </Text>
      </Page>
    </Document>
  );

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}-${year.toString()}`;
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    return formattedDateTime;
  }

  return (
    <>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <Stack
          direction='column'
          justifyContent='center'
          alignItems='center'
          spacing={2}
        >
          <img width={300} src={etlogo} alt='' />
          <TextField
            id='outlined-basic'
            label='Paste the Payment Code'
            variant='outlined'
            value={inputValue}
            onChange={handleInputChange}
          />
          <Stack direction={"row"} spacing={2}>
            <Button onClick={() => generatePdf()} variant='contained'>
              Generate
            </Button>
            {paymentData === "" ? (
              <></>
            ) : (
              <PDFDownloadLink
                document={<Pdf />}
                fileName={`${paymentData.firstName}_${formatDate(
                  Date.now()
                )}.pdf`}
              >
                <Button variant='contained'>Download</Button>
              </PDFDownloadLink>
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default PdfGenerator;
