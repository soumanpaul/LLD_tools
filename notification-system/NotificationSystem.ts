// NotificationSystem.ts

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
  constructor(protected notification: INotification) {}
  abstract getContent(): string;
}

// Decorator to add a timestamp to the content.
class TimestampDecorator extends INotificationDecorator {
  getContent(): string {
    // Use ISO-like timestamp; customize format as needed
    const ts = new Date().toISOString().replace("T", " ").slice(0, 19);
    return `[${ts}] ${this.notification.getContent()}`;
  }
}

// Decorator to append a signature to the content.
class SignatureDecorator extends INotificationDecorator {
  constructor(notification: INotification, private signature: string) {
    super(notification);
  }
  getContent(): string {
    return `${this.notification.getContent()}\n-- ${this.signature}\n\n`;
  }
}

/*============================
        Observer Components
=============================*/

interface IObserver {
  update(): void;
}

interface IObservable {
  addObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
  notifyObservers(): void;
}

class NotificationObservable implements IObservable {
  private observers = new Set<IObserver>();
  private currentNotification?: INotification;

  addObserver(observer: IObserver): void {
    this.observers.add(observer);
  }

  removeObserver(observer: IObserver): void {
    this.observers.delete(observer);
  }

  notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update();
    }
  }

  setNotification(notification: INotification): void {
    this.currentNotification = notification;
    this.notifyObservers();
  }

  getNotification(): INotification | undefined {
    return this.currentNotification;
  }

  getNotificationContent(): string {
    return this.currentNotification?.getContent() ?? "";
  }
}

// Concrete Observer 1
class Logger implements IObserver {
  constructor(private notificationObservable: NotificationObservable) {}
  update(): void {
    console.log(
      "Logging New Notification : \n" +
        this.notificationObservable.getNotificationContent()
    );
  }
}

/*============================
   Strategy Components (Observer 2)
=============================*/

interface INotificationStrategy {
  sendNotification(content: string): void;
}

class EmailStrategy implements INotificationStrategy {
  constructor(private emailId: string) {}
  sendNotification(content: string): void {
    console.log(`Sending email Notification to: ${this.emailId}\n${content}`);
  }
}

class SMSStrategy implements INotificationStrategy {
  constructor(private mobileNumber: string) {}
  sendNotification(content: string): void {
    console.log(
      `Sending SMS Notification to: ${this.mobileNumber}\n${content}`
    );
  }
}

class PopUpStrategy implements INotificationStrategy {
  sendNotification(content: string): void {
    console.log(`Sending Popup Notification: \n${content}`);
  }
}

class NotificationEngine implements IObserver {
  private notificationStrategies: INotificationStrategy[] = [];
  constructor(private notificationObservable: NotificationObservable) {}

  addNotificationStrategy(ns: INotificationStrategy): void {
    this.notificationStrategies.push(ns);
  }

  update(): void {
    const content = this.notificationObservable.getNotificationContent();
    for (const strategy of this.notificationStrategies) {
      strategy.sendNotification(content);
    }
  }
}

/*============================
          Service (Singleton)
=============================*/

class NotificationService {
  private static instance?: NotificationService;
  private observable = new NotificationObservable();
  private notifications: INotification[] = [];

  // Private to enforce singleton
  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  getObservable(): NotificationObservable {
    return this.observable;
  }

  sendNotification(notification: INotification): void {
    this.notifications.push(notification);
    this.observable.setNotification(notification);
  }
}

/*============================
              Demo
=============================*/

function main(): void {
  // Create NotificationService (Singleton)
  const notificationService = NotificationService.getInstance();

  // Get Observable
  const notificationObservable = notificationService.getObservable();

  // Create Observers
  const logger = new Logger(notificationObservable);

  const notificationEngine = new NotificationEngine(notificationObservable);
  notificationEngine.addNotificationStrategy(
    new EmailStrategy("random.person@gmail.com")
  );
  notificationEngine.addNotificationStrategy(new SMSStrategy("+91 9876543210"));
  notificationEngine.addNotificationStrategy(new PopUpStrategy());

  // Attach observers
  notificationObservable.addObserver(logger);
  notificationObservable.addObserver(notificationEngine);

  // Create a notification with decorators
  let notification: INotification = new SimpleNotification(
    "Your order has been shipped!"
  );
  notification = new TimestampDecorator(notification);
  notification = new SignatureDecorator(notification, "Customer Care");

  // Send
  notificationService.sendNotification(notification);
}
