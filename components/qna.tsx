import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"

const QNA = () => {
  return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How does the agent work?</AccordionTrigger>
              <AccordionContent>
                I'm a procurement assistant agent that helps evaluate suppliers based on procurement data. I use a combination of natural language processing and machine learning algorithms to analyze data and provide insights.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>What metrics do you use to evaluate suppliers?</AccordionTrigger>
              <AccordionContent>
                I use a weighted scoring system that considers five key metrics: Cost (35%), Quality (25%), Delivery (20%), Risk (10%), and Compliance (10%).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How do you calculate the overall score?</AccordionTrigger>
              <AccordionContent>
                I use a weighted average formula to calculate the overall score, taking into account the individual scores for each metric.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Can I customize the weights for each metric?</AccordionTrigger>
              <AccordionContent>
                Yes, you can provide custom weights for each metric, but please note that the default weights are based on industry best practices.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How do you handle missing data?</AccordionTrigger>
              <AccordionContent>
                If there is missing data for a particular metric, I will exclude that metric from the calculation and adjust the weights accordingly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>Can I get a ranking of suppliers based on a single metric?</AccordionTrigger>
              <AccordionContent>
                No, I'm designed to provide a comprehensive evaluation based on multiple metrics. Ranking suppliers based on a single metric can be misleading and may not provide a complete picture.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>How do you ensure data accuracy?</AccordionTrigger>
              <AccordionContent>
                I rely on the accuracy of the data provided to me. If the data is inaccurate or outdated, my evaluations may not be reliable.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>Can I use the agent for other procurement-related tasks?</AccordionTrigger>
              <AccordionContent>
                Currently, my primary function is to evaluate suppliers based on procurement data. However, I can provide general information and answer questions related to procurement best practices.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger>How do I get started with the agent?</AccordionTrigger>
              <AccordionContent>
                Simply ask me a question or provide a request related to supplier evaluation, and I'll guide you through the process.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger>What if I have a large dataset?</AccordionTrigger>
              <AccordionContent>
                I can handle large datasets, but please note that processing time may vary depending on the size of the dataset.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11">
              <AccordionTrigger>Can I save my evaluations for later reference?</AccordionTrigger>
              <AccordionContent>
                Yes, I can provide you with a summary of your evaluations, which you can save for later reference.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12">
              <AccordionTrigger>How do I know if the agent is working correctly?</AccordionTrigger>
              <AccordionContent>
                I'm designed to provide transparent and explainable results. If you have any concerns or questions about my evaluations, feel free to ask, and I'll do my best to clarify the results.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
  )
}

export default QNA