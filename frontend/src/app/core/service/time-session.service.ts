import { Injectable } from "@angular/core";
import { BehaviorSubject, interval, Subscription } from "rxjs";




@Injectable({
    providedIn: 'root'
})
export class TimeSessionService {

    private readonly expSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
    private countdonwSuscription: Subscription | null = null;

    // Iniciar con el contador
    startCountdown(exp: number) {
        this.stopCountdown(); // Detener cualquier contador existente
        this.updateTimeReamining(exp); // Actualizar el tiempo restante inmediatamente


        this.countdonwSuscription = interval(1000).subscribe(() => {
            this.updateTimeReamining(exp);
        })
    }

    // Actualizar el tiempo restante
    updateTimeReamining(exp: number) {
        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
        const timeRemaining = exp - currentTime; // Calcular el tiempo restante

        if (timeRemaining <= 0) {
            this.expSubject.next(timeRemaining)
        } else {
            this.stopCountdown();
            this.expSubject.next(0);
        }
    }

    // Detener el contador
    stopCountdown() {
        if (this.countdonwSuscription) {
            this.countdonwSuscription.unsubscribe();
            this.countdonwSuscription = null;
        }
    }

    // Reiniciar el contador
    resetCountdown() {
        console.log('Reiniciando contador');
        this.stopCountdown();
        this.expSubject.next(null);
    }


    // Devuelve el tiempo restante
    getRemainingTime(): BehaviorSubject<number | null> {
        return this.expSubject;
    }


}