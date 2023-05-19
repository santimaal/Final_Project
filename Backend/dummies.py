import django
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.settings')
django.setup()
from src.apps.sports.serializers import SportsSerializer
from src.apps.fields.serializers import FieldsSerializer
from src.apps.user.serializers import UserSerializer, ProfileSerializer
from src.apps.user.models import User
from src.apps.sports.models import Sport

# Const Sports
sports_name= ["Football", "Tennis", "Basketball", "Padel", "Futsal"]
sports_img= ["https://okdiario.com/img/2019/08/10/origen-del-futbol.jpg", "https://images7.alphacoders.com/734/thumb-1920-734192.jpg", "https://www.xtrafondos.com/descargar.php?id=1775&resolucion=2560x1600", "https://padelstar.es/wp-content/uploads/2022/05/que-material-elegir-para-jugar-al-padel.jpg", "https://www.costablancafutsalcup.com/Portals/7/EasyGalleryImages/8/240/8.jpg"]

# Const Users
users_first_name = ['Client', 'Admin', 'Santi', 'Sporty']
users_last_name = ['', '', 'Martinez Albert', 'Testing']
users_email = ['client@gmail.com', 'admin@gmail.com', 'santi@gmail.com', 'testing@sporty.com']
users_password_one = ['santi', 'santi', 'santi', 'santi', 'asdf']
users_type = ['client', 'admin', 'client', 'client']
users_avatar = ['https://i.postimg.cc/T3g6d9nk/image.png', 'https://i.postimg.cc/TYGdKBYz/admin.png', 'https://i.postimg.cc/4Nc0VCjD/image.jpg', 'https://i.postimg.cc/4Nc0VCjD/image.jpg']


def create_sports(n_sports, n_fields):
    for i in range(n_sports):
        sport = {
            'name': sports_name[i],
            'img': sports_img[i]
        }
        serializer_sport = SportsSerializer(data=sport)
        if serializer_sport.is_valid(raise_exception=True):
            existing_sport = Sport.objects.filter(name=sports_name[i]).exists()
            if not existing_sport:
                current_sport = serializer_sport.save()
                for j in range(n_fields):
                    field_data = {
                        'sport': current_sport.id,
                        'img': current_sport.img
                    }
                    field_serializer = FieldsSerializer(data=field_data)
                    if field_serializer.is_valid(raise_exception=True):
                        field_serializer.save()


def create_users():
    for i in range(len(users_first_name)):
        email = users_email[i]
        existing_user = User.objects.filter(email=email).exists()

        if not existing_user:
            user = {
                'first_name': users_first_name[i],
                'last_name': users_last_name[i],
                'email': email,
                'password': users_password_one[i],
                'type': users_type[i]
            }
            user_serializer = UserSerializer(data=user)
            if user_serializer.is_valid(raise_exception=True):
                user_ok = User.objects.create_user(
                    users_first_name[i],
                    users_last_name[i],
                    email,
                    users_password_one[i],
                    users_type[i]
                )
                if user_ok:
                    profile_serializer = ProfileSerializer(data={'user': user_ok.id, 'avatar': users_avatar[i]})
                    if profile_serializer.is_valid(raise_exception=True):
                        profile_serializer.save()


if __name__ == '__main__':
    create_sports(5, 3)
    create_users()
    print('Dummies created successfully')