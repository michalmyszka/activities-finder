import { toastController } from '@ionic/vue'

class NotificationService {
  async showNotification(message: string) {
    const toast = await toastController.create({
      message: message,
      duration: 3000,
    })
    return toast.present()
  }
}

export default new NotificationService()
