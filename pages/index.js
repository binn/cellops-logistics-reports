import { CheckIcon } from '@chakra-ui/icons';
import { Badge, Box, Center, Checkbox, Heading, HStack, Image, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { Inter } from '@next/font/google'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import queryString from "query-string";

const inter = Inter({ subsets: ['latin'] })

function Home() {
  const [data, setData] = useState({});
  const router = useRouter();
  const incoming = queryString.parse(router.asPath.split(/\?/)[1])?.incoming;
  // https://www.angelcellular.com/uploads/1/2/4/0/124019334/published/new-logo_2.png?1602712691
  // 0f67ffd3-ac9c-4b71-a9a1-fd7ce6f01c6a

  useEffect(() => {
    if (document === undefined)
      return;

    let dataElement = document.getElementById('DATA').innerText;
    if(incoming !== undefined && incoming !== '')
      dataElement = incoming;

    let lot = JSON.parse(dataElement);

    if (lot.tasks != undefined) {
      let gradingTasks = lot.tasks.filter(x => x.category === "GRADING");
      let testingTasks = lot.tasks.filter(x => x.category === "TESTING");
      if (gradingTasks.length > testingTasks.length) {
        let diff = gradingTasks.length - testingTasks.length;
        for (let i = diff; i > 0; i--) {
          lot.tasks.push({
            name: '__HIDDEN',
            category: "TESTING",
            completed: false
          });
        }
      } else if (gradingTasks.length < testingTasks.length) {
        let diff = testingTasks.length - gradingTasks.length;
        for (let i = diff; i > 0; i--) {
          lot.tasks.push({
            name: '__HIDDEN',
            category: "GRADING",
            completed: false
          });
        }
      }

      setData(lot);
    }
  }, []);

  if (data.tasks === undefined)
    return (
      <Heading>Loading...</Heading>
    )

  if(window !== undefined) {
      window.JSREPORT_READY_TO_START = true;
      setTimeout(window.print, 1000);

      window.onafterprint = function() {
        window.close();
      }
  }

  return (
    <>
      <Box mt={19} h='98vh'>
        <HStack justifyContent='space-between' justifyItems='stretch'>
          <Box>
            <Text>Phone tracking log</Text>
            <Heading>{data.lotNo}</Heading>
          </Box>
          <Box>
            <Image right={0} src="new-logo.png" h={35} />
          </Box>
        </HStack>

        <Box>
          <Badge colorScheme="red" hidden={!data.late}>LATE</Badge>
          <Badge colorScheme="yellow" hidden={!data.dueSoon}>DUE SOON</Badge>
          <Badge colorScheme="red" hidden={data.priority !== 3}>IMMEDIATE PRIORITY</Badge>
          <Badge colorScheme="red" hidden={data.priority !== 2}>URGENT PRIORITY</Badge>
          <Badge hidden={data.priority !== 1}>NORMAL PRIORITY</Badge>
          <Badge colorScheme="purple" hidden={data.priority !== 0}>LOW PRIORITY</Badge>
        </Box>

        <HStack mt={5} justifyContent='space-evenly'>
          <TableContainer w='50vw'>
            <Table size='sm'>
              <TableCaption mt={1}>Lot Information</TableCaption>
              <Tbody>
                <Tr>
                  <Td>
                    <b>Created At</b>
                  </Td>
                  <Td>
                    {new Date(data.createdAt.replace(' ', '+')).toLocaleString()}
                  </Td>
                </Tr>

                <Tr>
                  <Td>
                    <b>Model</b>
                  </Td>
                  <Td>
                    {data.model}
                  </Td>
                </Tr>

                <Tr>
                  <Td>
                    <b># of items</b>
                  </Td>
                  <Td>
                    {data.count}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <TableContainer w='50vw'>
            <Table size='sm'>
              <TableCaption mt={1}>Lot Information</TableCaption>
              <Tbody>
                <Tr>
                  <Td>
                    <b>Created By</b>
                  </Td>
                  <Td>
                    {data.createdBy}
                  </Td>
                </Tr>

                <Tr>
                  <Td>
                    <b>Grade</b>
                  </Td>
                  <Td>
                    {data.grade}
                  </Td>
                </Tr>

                <Tr>
                  <Td>
                    <b>Due At</b>
                  </Td>
                  <Td>
                    {new Date(data.expiration.replace(' ', '+')).toLocaleString()}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </HStack>

        <HStack mt={5} justifyContent='space-evenly'>
          <TableContainer w='50%'>
            <Table>
              <TableCaption>Tasks / Testing</TableCaption>
              <Thead>
                <Tr>
                  <Th borderColor='gray.400'>Task</Th>
                  <Th borderColor='gray.400'><CheckIcon /></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.tasks.filter(x => x.category === "TESTING").map(t =>
                  <>
                    <Tr>
                      <Td borderColor={t.name !== "__HIDDEN" ? "gray.400" : "white"}>
                        {t.name !== "__HIDDEN" ? t.name : ""}
                      </Td>
                      <Td borderColor={t.name !== "__HIDDEN" ? "gray.400" : "white"}>
                        <Checkbox checked={t.completed} borderColor={t.name !== "__HIDDEN" ? "black" : "white"}></Checkbox>
                      </Td>
                    </Tr>
                  </>)}
              </Tbody>
            </Table>
          </TableContainer>
          <TableContainer w='50%' marginInlineStart='0 !important;'>
            <Table>
              <TableCaption>Tasks / Grading</TableCaption>
              <Thead>
                <Tr>
                  <Th borderColor='gray.400'>Task</Th>
                  <Th borderColor='gray.400'><CheckIcon /></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.tasks.filter(x => x.category === "GRADING").map(t =>
                  <>
                    <Tr>
                      <Td borderColor="gray.400">
                        {t.name !== "__HIDDEN" ? t.name : ""}
                      </Td>
                      <Td borderColor="gray.400">
                        <Checkbox checked={t.completed} borderColor={t.name !== "__HIDDEN" ? "black" : "white"}></Checkbox>
                      </Td>
                    </Tr>
                  </>)}
              </Tbody>
            </Table>
          </TableContainer>
        </HStack>

        <TableContainer mt={5}>
          <Table>
            <TableCaption mt={0}>Lot Departments</TableCaption>
            <Thead>
              <Tr>
                <Th borderColor="gray.400">Department Name</Th>
                <Th borderColor="gray.400"># of items</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.assignments.map(d =>
                <>
                  <Tr>
                    <Td borderColor="gray.400">
                      {d.name}
                    </Td>
                    <Td borderColor="gray.400">
                    </Td>
                  </Tr>
                </>)}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Box position='absolute' bottom='0' right='0'>
        <Text>Printed by: <b>{data.printedBy}</b></Text>
      </Box>
    </>
  )
}

export default Home;