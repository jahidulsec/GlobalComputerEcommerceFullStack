from rest_framework import serializers
from .models import Newsteller, SideMenu, SubSideMenu, Category, Brand, Product, Reviews, Order, OrderItem, Slider, Banner, ProductImage, KeyFeature, Specification, SpecTable
from django.db.models import Avg, Count
from global_computer import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group


User = get_user_model()

# serializers


# brand
class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'slug', 'title', 'logo']





# category
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'slug', 'title']



# side menu
class SubSideMenuSerializer(serializers.ModelSerializer):
    side_menu = serializers.StringRelatedField(read_only=True)
    side_menu_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = SubSideMenu
        fields = ['id', 'slug', 'name', 'side_menu', 'side_menu_id']


class SideMenuSerializer(serializers.ModelSerializer):
    
    sub_side_menu = SubSideMenuSerializer(read_only=True, many=True)
    uploaded_submenu = serializers.ListField(
        child = serializers.CharField(max_length = 255), 
        write_only=True
    )

    class Meta:
        model = SideMenu
        fields = ['id', 'title', 'slug', 'logo', 'query', 'sub_side_menu', 'uploaded_submenu']
    

    def create(self, validated_data):
        uploaded_submenu = validated_data.pop("uploaded_submenu")
        side_menu = SideMenu.objects.create(**validated_data)
        for submenu in uploaded_submenu:
            newSubMenu = SubSideMenu.objects.create(side_menu_id=side_menu.id, name=submenu)
        
        return side_menu


# product image
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = [
            'id', 
            'product', 
            'image', 
        ]




# key features
class KeyFeatureSerializer(serializers.ModelSerializer):
    product = serializers.StringRelatedField(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = KeyFeature
        fields = ['id', 'field_name', 'field_description', 'product_id', 'product']



# specification
class SpecTableSerializer(serializers.ModelSerializer):
    specification = serializers.StringRelatedField(read_only=True)
    specification_id = serializers.IntegerField()

    class Meta:
        model = SpecTable
        fields = ['id', 'specification', 'specification_id', 'field_name', 'field_description']


class SpecificationSerializer(serializers.ModelSerializer):
    spec_table = SpecTableSerializer(many=True, read_only=True)
    product = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Specification
        fields = ['id', 'product', 'table_name', 'spec_table']


# review


class ReviewSerializer(serializers.ModelSerializer):
    product = serializers.StringRelatedField(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    user = serializers.StringRelatedField(read_only=True)
    user_id = serializers.IntegerField()
    average_stars = serializers.SerializerMethodField()
    count_review = serializers.SerializerMethodField()

    class Meta:
        model = Reviews
        fields = ['id', 'product', 'product_id', 'user', 'count_review',
                  'user_id', 'average_stars','comment', 'stars', 'date']
        
    def get_average_stars(self, obj):
        average = Reviews.objects.filter(product_id=obj.product_id).aggregate(Avg('stars')).get('stars__avg')
        if average == None:
            return 0
        return average

    def get_count_review(self, obj):
        count = Reviews.objects.filter(product_id=obj.product_id).aggregate(Count('user')).get('user__count')
        if count == None:
            return 0
        return count
        




# product
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True)
    brand_id = serializers.IntegerField(write_only=True)
    key_features = KeyFeatureSerializer(many=True, read_only=True)

    side_menu_id = serializers.IntegerField(write_only=True)

    average_stars = serializers.SerializerMethodField()
    count_review = serializers.SerializerMethodField()

    images = ProductImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child = serializers.ImageField(max_length = 1000000, allow_empty_file=False),
        write_only=True
    )

    specification = SpecificationSerializer(many=True, read_only=True)


    class Meta:
        model = Product
        fields = [
                    'id', 'title', 'slug', 'category', 'category_id', 'brand_id',
                    'model_name', 'price', 'prev_price', 'emi_price', 'average_stars', 'count_review',
                    'discount', 'is_stock', 'sold_stock', 'total_stock', 'description', "side_menu_id",
                    'featured', 'offered', 'offered_time', 'display_big',
                    'images', 'uploaded_images', 'key_features', 'specification'
                ]
        
    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        product = Product.objects.create(**validated_data)
        for image in uploaded_images:
            newProductImage = ProductImage.objects.create(product=product, image=image)
        
        return product
    
    def get_average_stars(self, obj):
        average = Reviews.objects.filter(product_id=obj.id).aggregate(Avg('stars')).get('stars__avg')
        if average == None:
            return 0
        return average

    def get_count_review(self, obj):
        count = Reviews.objects.filter(product_id=obj.id).aggregate(Count('user')).get('user__count')
        if count == None:
            return 0
        return count



class DisplayProductSerializer(serializers.ModelSerializer):
    key_features = KeyFeatureSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    average_stars = serializers.SerializerMethodField()
    count_review = serializers.SerializerMethodField()
    brand = serializers.StringRelatedField()
    category = serializers.StringRelatedField()

    class Meta:
        model = Product
        fields = ['id', 'title', 'slug', 'model_name', 'price', 'brand', 'category',
                  'prev_price', 'discount', 'is_stock', 'sold_stock', 'total_stock',
                  'average_stars', 'count_review', 'images', 'key_features', 'offered', 'offered_time'
                  ]
    
    def get_average_stars(self, obj):
        average = Reviews.objects.filter(product_id=obj.id).aggregate(Avg('stars')).get('stars__avg')
        if average == None:
            return 0
        return average

    def get_count_review(self, obj):
        count = Reviews.objects.filter(product_id=obj.id).aggregate(Count('user')).get('user__count')
        if count == None:
            return 0
        return count



class SingleProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True)
    brand = serializers.StringRelatedField(read_only=True)
    brand_id = serializers.IntegerField()
    side_menu = SideMenuSerializer(read_only=True)
    side_menu_id = serializers.IntegerField()
    key_features = KeyFeatureSerializer(many=True, read_only=True)

    images = ProductImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child = serializers.ImageField(max_length = 1000000, allow_empty_file=False),
        write_only=True
    )

    specification = SpecificationSerializer(many=True, read_only=True)

    reviews = ReviewSerializer(read_only=True, many=True)
    average_stars = serializers.SerializerMethodField()
    count_review = serializers.SerializerMethodField()


    class Meta:
        model = Product
        fields = [
                    'id', 'title', 'slug', 'category', 'category_id','brand', 'brand_id',
                    'side_menu', 'side_menu_id',
                    'model_name', 'price', 'prev_price', 'emi_price', 'display_big',
                    'discount', 'is_stock', 'sold_stock', 'total_stock', 'description',
                    'featured', 'offered', 'offered_time', 'average_stars', 'count_review',
                    'images', 'uploaded_images', 'key_features',
                    'specification', 'reviews'
                ]
        
    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        product = Product.objects.create(**validated_data)
        for image in uploaded_images:
            newProductImage = ProductImage.objects.create(product=product, image=image)
        
        return product
    
    def get_average_stars(self, obj):
        average = Reviews.objects.filter(product_id=obj.id).aggregate(Avg('stars')).get('stars__avg')
        if average == None:
            return 0
        return average

    def get_count_review(self, obj):
        count = Reviews.objects.filter(product_id=obj.id).aggregate(Count('user')).get('user__count')
        if count == None:
            return 0
        return count
    
   


# single image add
class SingleProductImageSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()
    image = serializers.StringRelatedField(read_only=True)
    uploaded_images = serializers.ListField(
        child = serializers.ImageField(max_length = 1000000, allow_empty_file=False),
        write_only=True
    )
    class Meta:
        model = ProductImage
        fields = ['id',  'product_id', 'image', 'uploaded_images']

    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        product = Product.objects.get(pk=validated_data['product_id'])
        for image in uploaded_images:
            newProductImage = ProductImage.objects.create(product=product, image=image)
            newProductImage.save()
        
        return newProductImage



# display product brand
class DisplayProductBrandSerializer(serializers.ModelSerializer):
    brand = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Product
        fields = ['brand']


# slider
class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = ['id', 'slider_url', 'mini_text', 'mid_text', 'color', 'image']


# banner
class BannerSerializer(serializers.ModelSerializer):
    product = serializers.StringRelatedField(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = Banner
        fields = ['id', 'product', 'title', 'subtitle', 'slogan', 'color', 'image', 'product_id']




# order
class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.StringRelatedField(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_id', 'unit_price', 'quantity', 'price',]



class OrderSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only = True)
    user_id = serializers.IntegerField()
    orders = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order 
        fields = ['id', 'user', 'user_id', 'slug', 'status', 'total', 'shipping_cost', 'date', 'phone', 
                  'street_address', 'district', 'division', 'order_note', 
                  'payment_method', 'orders']
        
        

class SingleOrderSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only = True)
    user_id = serializers.IntegerField()
    orders = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order 
        fields = ['id', 'user', 'user_id', 'slug', 'status', 'total', 'shipping_cost', 'date', 'phone', 
                  'street_address', 'district', 'division', 'order_note', 
                  'payment_method', 'orders']




# newsteller
class NewstellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsteller
        fields = ['id', 'email']


# user profile
class UserProfileSerializer(serializers.ModelSerializer):
    groups = serializers.StringRelatedField(read_only = True, many= True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'phone_number', 'street_address', 'district', 'division', 'image', 'groups']

