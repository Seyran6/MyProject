import vk_api
import random
import os
from dotenv import load_dotenv

load_dotenv()
token = os.environ.get('VK_TOKEN')
vk = vk_api.VkApi(token=token)

user_id = "746622538"
def vk_send(message):
    random_id = random.randint(1, 10000)
    vk.method('messages.send', {
        'user_id': user_id,
        'message': message,
        'random_id': random_id
    })
