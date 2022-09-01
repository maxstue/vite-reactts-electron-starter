import React from "react"
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    Button, Input, Radio, RadioGroup, Select, Switch, CheckboxGroup, Checkbox, 
    Stack,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Image
  } from '@chakra-ui/react'

  import { SunIcon, AddIcon } from "@chakra-ui/icons"


const MarketDepthConfig = function(props) {


    return (
        <>
            <Modal isOpen={props.isOpen} onClose={props.onClose} size="full">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="font-bold uppercase">Configure Market Depth Window</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div>
                            <div>
                                <p className="bg-blue-200 p-2 border-2 border-dotted border-blue-500 font-semibold">Select Market Depth Display Type</p>
                                <div className="p-3">
                                    <Tabs>
                                        <TabList>
                                            <Tab>Detailed Table</Tab>
                                            <Tab>Detailed Vertical</Tab>
                                            <Tab>Smart Vertical</Tab>
                                            <Tab>Smart Table</Tab>
                                            <Tab>Cumulative</Tab>
                                        </TabList>

                                        <TabPanels>
                                            <TabPanel>
                                                <p>one!</p>
                                            </TabPanel>
                                            <TabPanel>
                                                <p>two!</p>
                                            </TabPanel>
                                            <TabPanel>
                                                <div className="flex flex-row">
                                                    <div className="w-1/4">
                                                        <p>Displays the market depth vertically with the sizes aggregated by Market Maker IDs. This makes the market depth more compact, easier to read, and most importantly, see the zone between bid and ask where the market maker is most likely to fill a market order</p>
                                                        <p>A Smart Vertical Market Depth with a slim profile can be lined up right beside a chart since it displays individual price levels</p>
                                                        <div className="flex-flex-row">
                                                            <RadioGroup>
                                                                <Stack direction="row">
                                                                    <Radio value="wide">Wide Profile</Radio>
                                                                    <Radio value="slim">Slim Profile</Radio>
                                                                </Stack>
                                                            </RadioGroup>
                                                        </div>
                                                    </div>
                                                    <div className="w-3/4">
                                                        <Image src="assets/images/smart-vertical-wide.PNG" alt="Smart Vertical Wide Profile" />
                                                    </div>
                                                </div>     
                                            </TabPanel>
                                            <TabPanel>
                                                <p>three!</p>
                                            </TabPanel>
                                            <TabPanel>
                                                <p>three!</p>
                                            </TabPanel>
                                        </TabPanels>    
                                    </Tabs>
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="w-1/2 mr-5">
                                    
                                    <div className="mb-2 ">
                                        <p className="bg-blue-200 p-2 border-2 border-dotted border-blue-500 font-semibold">Row Configuration</p>
                                        <div className="flex flex-row p-5"><p>Number of Rows </p>&nbsp; <p><Input size="xs" /></p></div>
                                    </div>
                                    <div>
                                        <p className="bg-blue-200 p-2 border-2 border-dotted border-blue-500 font-semibold">Row Filter / Cell Highlight</p>
                                        <Tabs>
                                            <TabList>
                                                <Tab>MMID</Tab>
                                                <Tab>Size</Tab>
                                                <Tab>Price</Tab>
                                                <Tab>Groups</Tab>
                                            </TabList>

                                            <TabPanels>
                                                <TabPanel>
                                                    <p>one!</p>
                                                </TabPanel>
                                                <TabPanel>
                                                    <Stack direction="row" className="border-b p-3">
                                                        <Select size="sm">
                                                            <option value=">=">&gt;=</option>
                                                            <option value=">">&gt;</option>
                                                            <option value="<=">&lt;=</option>
                                                            <option value="<">&lt;</option>
                                                        </Select>
                                                        <Input size="sm" />
                                                        <Stack direction="row">
                                                            <span>Show</span>
                                                            <span><Switch colorScheme="green" size="sm" /></span>
                                                        </Stack>
                                                        <Stack direction="row" >
                                                            <span>Highlight</span>
                                                            <span className="inline-block cursor-pointer hover:text-yellow-500"><SunIcon /></span>
                                                            {/*Clicking this should make a color picker dropdown. react-color may be a good lib to use for this. Chakra UI has a tooltip component that can be used to make it smooth*/}
                                                        </Stack>
                                                    </Stack>
                                                    <Stack direction="row" className="mt-2">
                                                        <span><AddIcon /></span>
                                                        <span className="italic">Add a new size condition</span>
                                                    </Stack>
                                                </TabPanel>
                                                <TabPanel>
                                                    <p>three!</p>
                                                </TabPanel>
                                                <TabPanel>
                                                    <p>four!</p>
                                                </TabPanel>
                                            </TabPanels>
                                        </Tabs>
                                    </div>
                                </div>

                                <div className="w-1/2">
                                    <p className="bg-blue-200 p-2">Column Configuration</p>
                                    <div className="flex flex-row">
                                        <div className="w-1/4">
                                            <p>All Columns</p>
                                        </div>
                                        <div className="w-3/4">
                                            <p>Displayed Columns</p>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                            <div>
                                <CheckboxGroup colorScheme='green' defaultValue="this-window">
                                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                                        <Checkbox value='this-window'>Save for this window</Checkbox>
                                        <Checkbox value='windows-default'>Save as default for all windows</Checkbox>
                                        <Checkbox value='current-asset'>Save as default for current asset</Checkbox>
                                    </Stack>
                                </CheckboxGroup>
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                        Close
                        </Button>
                        {/* <Button variant='ghost'>Secondary Action</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MarketDepthConfig