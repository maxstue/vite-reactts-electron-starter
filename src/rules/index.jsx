import React from "react"
import { useGlobal } from "reactn"
import RuleRow from "./rule-row"
import { Stack } from "@chakra-ui/react"

const Rules = function () {

    const [ rules, setRules ] = useGlobal("rules")
    const [selectedAsset] = useGlobal("selectedAsset")

    const handleRules = React.useCallback((data) => {
       setRules(data)
    }, [])

    React.useEffect( async () => {
        // socket.on("rules", handleRules)

        // return () => {
        //     socket.off("rules", handleRules)
        // }

        const response = await window.Main.asyncData({
            route: "rules/get-many",
        })
        if (response.data) handleRules(response.data)
        console.log("rules data", response)
    }, [handleRules])
    
    let activeRules = []
    let executedRules = []
    if (selectedAsset && rules && rules.length > 0) {
        activeRules = rules.filter(rule => rule.symbol === selectedAsset && rule.status === "active")

        executedRules = rules.filter(rule => rule.symbol === selectedAsset && rule.status === "executed")
        
    }

    return (
        <>
            <Stack>
                <div>
                    { activeRules.length > 0 && (
                    <>
                        <div className="font-semibold underline mb-1">Active Rules</div>
                        <div>
                            {activeRules.map(item => {
                                return <RuleRow key={item.id} rule={item} />
                            })}
                        </div>
                    
                    </>
                      
                    )}
                </div>          
                <div>
                    { executedRules.length > 0 && (
                        <>
                            <div className="font-semibold underline my-1">Executed Rules</div>
                            <div>
                                {executedRules.map(item => {
                                    return <RuleRow key={item.id} rule={item} />
                                })}
                            </div>
                        </>
                    )}
                </div>
            </Stack>
            
        </>
    )
}

export default Rules 