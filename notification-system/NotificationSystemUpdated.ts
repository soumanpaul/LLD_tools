// Decorator + Observer + Strategy + Singleton
// NotificationSystemUpdated.ts

/*============================
      Notification & Decorators
=============================*/

interface INotification {
  getContent(): string;
}

// Concrete Notification: simple text notification.
class SimpleNotification implements INotification {
  constructor(private text: string) {}
  getContent(): string {
    return this.text;
  }
}

// Abstract Decorator: wraps a Notification object.
abstract class INotificationDecorator implements INotification {
  protected notification: INotification;
  constructor(n: INotification) {
    this.notification = n;
  }
  abstract getContent(): string;
}

// Decorator to add a timestamp to the content.
class TimestampDecorator extends INotificationDecorator {
  // Optionally let callers inject a clock/format for testing
  constructor(n: INotification, private now: () => Date = () => new Date()) {
    super(n);
  }
  getContent(): string {
    const d = this.now();
    const ts =
      [
        d.getFullYear(),
        String(d.getMonth() + 1).padStart(2, "0"),
        String(d.getDate()).padStart(2, "0"),
      ].join("-") +
      " " +
      [
        String(d.getHours()).padStart(2, "0"),
        String(d.getMinutes()).padStart(2, "0"),
        String(d.getSeconds()).padStart(2, "0"),
      ].join(":");
    return `[${ts}] ${this.notification.getContent()}`;
  }
}

// Decorator to append a signature to the content.
class SignatureDecorator extends INotificationDecorator {
  constructor(n: INotification, private signature: string) {
    super(n);
  }
  getContent(): string {
    return `${this.notification.getContent()}\n-- ${this.signature}\n\n`;
  }
}

/*============================
  Observer Pattern Components
=============================*/

interface IObserver {
  update(): void;
}

interface IObservable {
  addObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
  notifyObservers(): void;
}

// Concrete Observable
class NotificationObservable implements IObservable {
  private observers = new Set<IObserver>();
  private currentNotification: INotification | null = null;

  addObserver(obs: IObserver): void {
    this.observers.add(obs);
  }

  removeObserver(obs: IObserver): void {
    this.observers.delete(obs);
  }

  notifyObservers(): void {
    for (const obs of this.observers) {
      obs.update();
    }
  }

  setNotification(notification: INotification): void {
    this.currentNotification = notification;
    this.notifyObservers();
  }

  getNotification(): INotification | null {
    return this.currentNotification;
  }

  getNotificationContent(): string {
    if (!this.currentNotification) return "";
    return this.currentNotification.getContent();
  }
}

/*============================
       NotificationService
=============================*/

// Singleton class
class NotificationService {
  private static instance: NotificationService | null = null;
  private observable: NotificationObservable;
  private notifications: INotification[] = [];

  private constructor() {
    this.observable = new NotificationObservable();
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Expose the observable so observers can attach.
  getObservable(): NotificationObservable {
    return this.observable;
  }

  // Creates a new Notification and notifies observers.
  sendNotification(notification: INotification): void {
    this.notifications.push(notification);
    this.observable.setNotification(notification);
  }
}

/*============================
       ConcreteObservers
=============================*/

class Logger implements IObserver {
  private notificationObservable: NotificationObservable;

  constructor(observable?: NotificationObservable) {
    this.notificationObservable =
      observable ?? NotificationService.getInstance().getObservable();
    this.notificationObservable.addObserver(this);
  }

  update(): void {
    console.log(
      "Logging New Notification : \n" +
        this.notificationObservable.getNotificationContent()
    );
  }
}

/*============================
  Strategy Pattern Components (Concrete Observer 2)
=============================*/

interface INotificationStrategy {
  sendNotification(content: string): void;
}

class EmailStrategy implements INotificationStrategy {
  constructor(private emailId: string) {}
  sendNotification(content: string): void {
    // Simulate email
    console.log(`Sending email Notification to: ${this.emailId}\n${content}`);
  }
}

class SMSStrategy implements INotificationStrategy {
  constructor(private mobileNumber: string) {}
  sendNotification(content: string): void {
    // Simulate SMS
    console.log(
      `Sending SMS Notification to: ${this.mobileNumber}\n${content}`
    );
  }
}

class PopUpStrategy implements INotificationStrategy {
  sendNotification(content: string): void {
    // Simulate popup
    console.log(`Sending Popup Notification: \n${content}`);
  }
}

class NotificationEngine implements IObserver {
  private notificationObservable: NotificationObservable;
  private notificationStrategies: INotificationStrategy[] = [];

  constructor(observable?: NotificationObservable) {
    this.notificationObservable =
      observable ?? NotificationService.getInstance().getObservable();
    this.notificationObservable.addObserver(this);
  }

  addNotificationStrategy(ns: INotificationStrategy): void {
    this.notificationStrategies.push(ns);
  }

  // Can have removeNotificationStrategy as well.

  update(): void {
    const content = this.notificationObservable.getNotificationContent();
    for (const strategy of this.notificationStrategies) {
      strategy.sendNotification(content);
    }
  }
}

/*============================
                Demo
=============================*/

export class NotificationSystemUpdated {
  static main(): void {
    // Create NotificationService.
    const notificationService = NotificationService.getInstance();

    // Create Logger Observer
    new Logger();

    // Create NotificationEngine observers.
    const notificationEngine = new NotificationEngine();
    notificationEngine.addNotificationStrategy(
      new EmailStrategy("random.person@gmail.com")
    );
    notificationEngine.addNotificationStrategy(
      new SMSStrategy("+91 9876543210")
    );
    notificationEngine.addNotificationStrategy(new PopUpStrategy());

    // Build notification via decorators
    let notification: INotification = new SimpleNotification(
      "Your order has been shipped!"
    );
    notification = new TimestampDecorator(notification); // uses current time
    notification = new SignatureDecorator(notification, "Customer Care");

    // Send
    notificationService.sendNotification(notification);
  }
}

// Run the demo if executed directly (ts-node or compiled JS)
if (require.main === module) {
  NotificationSystemUpdated.main();
}

// To run:
// npm i -D typescript ts-node @types/node
// npx ts-node NotificationSystemUpdated.ts
