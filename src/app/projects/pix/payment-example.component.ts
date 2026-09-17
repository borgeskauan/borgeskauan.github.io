import {TranslatePipe} from '../../i18n/locale.service';
import {Component,OnDestroy,signal} from '@angular/core';
@Component({imports:[TranslatePipe],selector:'app-payment-example',templateUrl:'./payment-example.component.html',styleUrl:'./payment-example.component.css'})
export class PaymentExampleComponent implements OnDestroy {
 readonly mode=signal(0); readonly step=signal(0); readonly running=signal(false); readonly declined=signal(false);
 readonly titles=['Protect the money','Prevent duplicate transfers','Keep the answer available'];
 readonly messages=[['R$100 is ready to send.','R$100 is reserved. It cannot be spent elsewhere.','The receiving bank accepts the payment.','R$100 reaches the recipient.'],['One payment instruction, for R$100.','The first instruction moves R$100.','Copies of the same instruction arrive.','All copies match one payment. No second debit.'],['Money and its confirmation take separate journeys.','The money arrives. Its confirmation does not.','A copy of the result is still saved.','Only the confirmation travels again.']];
 private timer:ReturnType<typeof setInterval>|undefined;
 select(mode:number){this.stop();this.mode.set(mode);this.step.set(0);this.declined.set(false);}
 play(){this.stop();this.step.set(0);this.running.set(true);this.timer=setInterval(()=>{this.step.update(s=>s+1);if(this.step()===3)this.stop();},2600);}
 stop(){if(this.timer)clearInterval(this.timer);this.timer=undefined;this.running.set(false);}
 message(){if(this.mode()===0&&this.declined()&&this.step()>=2)return this.step()===2?'The receiving bank declines the payment.':'R$100 is available to the sender again.';return this.messages[this.mode()][this.step()];}
 sender(){return this.mode()===0&&(this.step()===0||(this.declined()&&this.step()===3))?200:100;}
 recipient(){return this.mode()!==0||(this.step()===3&&!this.declined())?100:0;}
 ngOnDestroy(){this.stop();}
}
