export const paymentNotes = [
  {title:'Preparing a payment', text:'A person asks their bank to send R$100 to a friend. The bank prepares a request with the amount and the recipient. At this point, the money has not moved.'},
  {title:'Processing the request', text:'The payment system processes the request and transfers the money. It also prepares an answer for the bank. Completing the payment and delivering that answer are separate events.'},
  {title:'A missing answer', text:'In this example, the answer does not reach the sending bank. The bank cannot tell whether its request was lost, whether processing is still underway, or whether the payment finished and only the answer is missing.'},
  {title:'Repeating the request', text:'Sending the request again can help if the original never arrived. The bank therefore repeats the same instruction, with the same payment reference. The person has not asked to make another payment.'},
  {title:'An incomplete implementation', text:'If a system treats every arriving message as a new payment, the repeated request transfers another R$100. This is an illustration of the problem; it is not the behavior of the completed project.'},
  {title:'Recording the first payment', text:'Return to the first transfer and add a record of it. The system stores the payment reference and its contents together with the result. Here, payment 42 for R$100 has already completed.'},
  {title:'Checking the repeated request', text:'When the bank repeats payment 42, the system checks its reference and contents. Both match the completed payment, so no money moves again. Different contents under the same reference would be a conflict.'},
  {title:'Delivering the result', text:'The original answer remains available through the notification recovery process. When it reaches the bank, the bank can confirm the payment. Repeating the request does not create a new payment or a new answer.'}
] as const;
