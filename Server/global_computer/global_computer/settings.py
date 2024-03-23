"""
Django settings for global_computer project.

Generated by 'django-admin startproject' using Django 4.2.4.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
import os
from datetime import timedelta

from dotenv import load_dotenv
load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
if os.environ.get('DEBUG', False) == 'True':
    DEBUG = True
else: 
    DEBUG = False


### ------ DJANGO APP SECURITY -------###
if os.environ.get('DEBUG', False) == "False":

    # Cross-site Scripting for deploy
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True

    # # SSL redirect
    SECURE_SSL_REDIRECT = True

    # # HTTP Strict Transport Security
    SECURE_HSTS_SECONDS = 86400
    SECURE_HSTS_PRELOAD = True
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True

    # #  Cross-site request forgery (CSRF) protection
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True

## ------ END DJANGO APP SECURITY -------##



ALLOWED_HOSTS = ['127.0.0.1','localhost']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'global_computer_api',
    'account',
    'rest_framework',
    'rest_framework.authtoken',
    'django_filters',
    'django_cleanup.apps.CleanupConfig',
    'phonenumber_field',
    'djoser',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'global_computer.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'global_computer.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases


### ------ MUST COMMENT IN LOCAL DATABASE BEFORE FINAL PUSH ------ ###






### ------ MUST COMMENT OUT GLOBAL DATABASE BEFORE FINAL PUSH ------ ###

# if os.getenv('DEBUG') == 'False':
if os.environ.get('DEBUG', False) == "True":
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': os.environ.get("DB_NAME"),
            'USER': os.environ.get("USERNAME"),
            'PASSWORD': os.environ.get("PASSWORD"),
            'HOST': os.environ.get("HOST"),
            'PORT': '3306',
            # 'OPTIONS': {'sslmode': 'require'},
        }
    }






# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
MEDIA_URL = "/media/"


if os.environ.get('DEBUG', False) == 'True':
    STATIC_DIRS = os.path.join(BASE_DIR, 'static')
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles_build', 'static')
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

else:
    STATIC_DIRS = '/home/jahidul/global_computer_api/static'
    STATIC_ROOT = '/home/jahidul/global_computer_api/static'
    MEDIA_ROOT = '/home/jahidul/global_computer_api/media'



# CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWED_ORIGINS = [
    'http://localhost:4000',
    'http://localhost:5001',
]

# configure email for backend
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = os.environ.get("E_PORT")
EMAIL_HOST_USER = os.environ.get("E_USER")
EMAIL_HOST_PASSWORD = os.environ.get("E_PASSWORD")
EMAIL_USE_TLS = True




# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


SIMPLE_JWT = {
    "AUTH_HEADER_TYPES": ("JWT",),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
}



REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ),
}


if os.environ.get('DEBUG', False) == 'True':
    DOMAIN = 'localhost:4000'
else: 
    DOMAIN = 'globalcomputer.com.bd'

SITE_NAME = 'Global Computer (BD)'



AUTH_USER_MODEL = 'account.User'


DJOSER  = {
    'USER_ID_FIELD': 'username',
    'LOGIN_FIELD': 'email',
    'USER_CREATE_PASSWORD_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_URL': 'password/reset/confirm/{uid}/{token}',
    # 'ACTIVATION_URL': 'activate/{uid}/{token}',
    # 'SEND_ACTIVATION_EMAIL': True,
    'SEND_CONFIRMATION_EMAIL': True,
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,
}