"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    wxOConfiguration?: {
      orchestrationID: string
      hostURL: string
      rootElementID: string
      deploymentPlatform: string
      crn: string
      token?: string
      chatOptions: {
        agentId: string
        agentEnvironmentId: string
        onLoad: (instance: any) => void
      }
    }
    wxoChatInstance?: any
    wxoLoader?: {
      init: () => void
    }
  }
}

// Use the new Next.js API route instead of separate backend server
const JWT_API_URL = "/api/jwt/create"

export default function WatsonxOrchestrate() {
  useEffect(() => {
    function getUserId() {
      let embed_user_id = sessionStorage.getItem("embed_user_id")
      if (!embed_user_id) {
        embed_user_id = String(Math.trunc(Math.random() * 1000000))
        sessionStorage.setItem("embed_user_id", embed_user_id)
      }
      return embed_user_id
    }

    function preSendHandler(event: any) {
      if (event?.message?.content) {
        // Example modification: uppercase content (optional)
        // event.message.content = event.message.content.toUpperCase();
      }
    }

    function sendHandler(event: any) {
      console.log("send event", event)
    }

    function feedbackHandler(event: any) {
      console.log("feedback", event)
    }

    function preReceiveHandler(event: any) {
      // Example modification: change type to date (optional)
      // event?.content?.map((element: any) => {
      //     element.type = 'date';
      // });
    }

    function receiveHandler(event: any) {
      console.log("received event", event)
    }

    // Handle token renewal when needed
    async function authTokenNeededHandler(event: any) {
      console.log("Auth token needed, fetching new token...")
      try {
        const result = await fetch(JWT_API_URL, {
          method: 'GET',
          credentials: 'include', // Important: include cookies for session
          headers: {
            'Accept': 'text/plain'
          }
        })
        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`)
        }
        const newToken = await result.text()
        console.log("New token fetched successfully")
        console.log("Token preview:", newToken.substring(0, 50) + "...")
        
        // Set the new token on the event
        event.authToken = newToken
        
        // Also update the configuration
        if (window.wxOConfiguration) {
          window.wxOConfiguration.token = newToken
        }
      } catch (error) {
        console.error("Failed to fetch new auth token:", error)
      }
    }

    function onChatLoad(instance: any) {
      instance.on("chatstarted", (instance: any) => {
        window.wxoChatInstance = instance
        console.log("Chat started successfully")
      })
      instance.on("pre:send", preSendHandler)
      instance.on("send", sendHandler)
      instance.on("pre:receive", preReceiveHandler)
      instance.on("receive", receiveHandler)
      instance.on("feedback", feedbackHandler)
      instance.on("authTokenNeeded", authTokenNeededHandler)
    }

    async function getIdentityToken() {
      try {
        // This will make a call to the Next.js API route to request a new JWT.
        const result = await fetch(JWT_API_URL, {
          method: 'GET',
          credentials: 'include', // Important: include cookies for session
          headers: {
            'Accept': 'text/plain'
          }
        })
        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`)
        }
        const token = await result.text()
        if (window.wxOConfiguration) {
          window.wxOConfiguration.token = token
          console.log("Initial identity token fetched successfully")
          console.log("Token preview:", token.substring(0, 50) + "...")
        }
        return token
      } catch (error) {
        console.error("Failed to fetch identity token:", error)
        throw error
      }
    }

    // Initialize Watsonx Orchestrate configuration
    window.wxOConfiguration = {
      orchestrationID: "6f620c26ce36469dbb2840b12e02f04f_e4abbb29-679d-4ad0-955e-5adccc640375",
      hostURL: "https://au-syd.watson-orchestrate.cloud.ibm.com",
      rootElementID: "root",
      deploymentPlatform: "ibmcloud",
      crn: "crn:v1:bluemix:public:watsonx-orchestrate:au-syd:a/6f620c26ce36469dbb2840b12e02f04f:e4abbb29-679d-4ad0-955e-5adccc640375::",
      chatOptions: {
        agentId: "6fed6731-63ad-4d40-ae65-8251e3b883c1",
        agentEnvironmentId: "39557e9f-c426-4e6d-8040-a3d0ba8bdb82",
        onLoad: onChatLoad,
      },
    }

    // Initialize chat after fetching token
    getIdentityToken()
      .then((token) => {
        console.log("Starting Watsonx Orchestrate initialization...")
        const script = document.createElement("script")
        script.src = `${window.wxOConfiguration!.hostURL}/wxochat/wxoLoader.js?embed=true`
        script.addEventListener("load", function () {
          console.log("Watsonx script loaded, initializing...")
          if (window.wxoLoader) {
            window.wxoLoader.init()
          }
        })
        script.addEventListener("error", function (error) {
          console.error("Failed to load Watsonx script:", error)
        })
        document.head.appendChild(script)
      })
      .catch((error) => {
        console.error("Failed to initialize Watsonx Orchestrate:", error)
      })

    // Cleanup function
    return () => {
      // Remove script if component unmounts
      const scripts = document.querySelectorAll('script[src*="wxoLoader.js"]')
      scripts.forEach((script) => script.remove())
    }
  }, [])

  return <div id="root"></div>
}
