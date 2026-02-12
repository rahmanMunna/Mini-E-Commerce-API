/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, Session, UseGuards } from '@nestjs/common';
import { CartDto } from './dto/add-to-cart.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiHeader } from '@nestjs/swagger';
import { CartItem } from 'src/interfaces/cart.interface';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('cart')
export class CartController {

    @Get()
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(['customer'])
    @ApiBearerAuth()
    @ApiHeader({name: 'x-user-id', required: true,})
    // @ApiCreatedResponse({ type: [], isArray: true })
    getCart(@CurrentUser('x-user-id') userId: string,@Session() session: Record<string, any>) {
        const userCart = session.carts?.[userId] || [];
        // Access session data
        return {
            userId,
            cart: userCart
        };
    }

    @Post()
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(['customer'])
    @ApiBearerAuth()
    @ApiHeader({name: 'x-user-id', required: true,})
    @ApiCreatedResponse({ type: String })
    addToCart(
        @Body() dto: CartDto,
        @CurrentUser('x-user-id') userId: string,
        @Session() session: Record<string, any>,
    ) {

    console.log('User ID from header:', userId);
        
    if (!session.carts) {
        session.carts = {};
    }
    
    // Initialize this specific user's cart if doesn't exist
    if (!session.carts[userId]) {
        session.carts[userId] = [];
    }

    // Get the current user's cart
    const userCart = session.carts[userId];

    // Check if item already exists in this user's cart
    const existingItemIndex = userCart.findIndex(
        (cartItem: CartItem) => cartItem.productId === dto.productId
    );

     if (existingItemIndex > -1) {
        // Update quantity for existing item
        userCart[existingItemIndex].qty += dto.qty;
    }
    else {
        // Add new item to this user's cart
        userCart.push({
            ...dto,
            addedAt: new Date(),
        });
    }
     return { 
        success: true, 
        userId: userId, 
        cart: userCart 
    };
}

    @Patch('update')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(['customer'])
    @ApiBearerAuth()
    @ApiHeader({name: 'x-user-id', required: true,})
    @ApiCreatedResponse({ type: String })
    updateCartItem(
    @Body() dto: CartDto,
    @CurrentUser('x-user-id') userId: string,
    @Session() session: Record<string, any>,
) {
    // Check if user has a cart
    if (!session.carts?.[userId]) {
        return { success: false, message: 'Cart is empty' };
    }
    
    const userCart = session.carts[userId];
    const existingItemIndex = userCart.findIndex(
        (cartItem: CartItem) => cartItem.productId === dto.productId
    );

    if (existingItemIndex > -1) {
        // Update quantity to the new value (replace, not add)
        userCart[existingItemIndex].qty = dto.qty;
        
        // If quantity is 0 or less, remove the item
        if (userCart[existingItemIndex].qty <= 0) {
            userCart.splice(existingItemIndex, 1);
            return { 
                success: true, 
                message: 'Product removed from cart (quantity set to 0)',
                cart: userCart 
            };
        }
        
        return { 
            success: true, 
            message: `Product quantity updated successfully to ${userCart[existingItemIndex].qty}`,
            cart: userCart 
        };
    }
    
    return { success: false, message: 'Product not found in cart' };
}

    @Patch('increase/:pId')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(['customer'])
    @ApiBearerAuth()
    @ApiHeader({name: 'x-user-id', required: true,})
    @ApiCreatedResponse({ type: String })
    increaseCartItemQty(
    @Param('pId', ParseIntPipe) productId: number,
    @CurrentUser('x-user-id') userId: string,
    @Session() session: Record<string, any>,
) {
    // Check if user has a cart
    if (!session.carts?.[userId]) {
        return { success: false, message: 'Cart is empty' };
    }
    
    const userCart = session.carts[userId];
    const existingItemIndex = userCart.findIndex(
        (cartItem: CartItem) => cartItem.productId === productId
    );

    if (existingItemIndex > -1) {
        // Increase quantity
        userCart[existingItemIndex].qty += 1;
        return { 
            success: true, 
            message: `Product quantity increased successfully to ${userCart[existingItemIndex].qty}`,
            cart: userCart 
        };
    }
    
    return { success: false, message: 'Product not found in cart' };
}

    @Patch('decrease/:pId')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(['customer'])
    @ApiBearerAuth()
    @ApiHeader({name: 'x-user-id', required: true,})
    @ApiCreatedResponse({ type: String })
    decreaseCartItemQty(
    @Param('pId', ParseIntPipe) productId: number,
    @CurrentUser('x-user-id') userId: string,
    @Session() session: Record<string, any>,
) {
    // Check if user has a cart
    if (!session.carts?.[userId]) {
        return { success: false, message: 'Cart is empty' };
    }
    
    const userCart = session.carts[userId];
    const existingItemIndex = userCart.findIndex(
        (cartItem: CartItem) => cartItem.productId === productId
    );

    if (existingItemIndex > -1) {
        // Decrease quantity
        userCart[existingItemIndex].qty -= 1;
        
        if (userCart[existingItemIndex].qty <= 0) {
            // Remove item if quantity becomes 0 or negative
            userCart.splice(existingItemIndex, 1);
            return { 
                success: true, 
                message: 'Product has been removed from cart',
                cart: userCart 
            };
        }
        
        return { 
            success: true, 
            message: `Product quantity decreased successfully to ${userCart[existingItemIndex].qty}`,
            cart: userCart 
        };
    }
    
    return { success: false, message: 'Product not found in cart' };
    }

    @Delete(':pId')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(['customer'])
    @ApiBearerAuth()
    @ApiHeader({name: 'x-user-id', required: true,})
    @ApiCreatedResponse({ type: String })
    deleteCartItem(
        @Param('pId', ParseIntPipe) productId: number,
        @CurrentUser('x-user-id') userId: string,
        @Session() session: Record<string, any>,
    ) {
        // Check if user has a cart
        if (!session.carts?.[userId]) {
            return { success: false, message: 'Cart is empty' };
        }
        
        const userCart = session.carts[userId];
        const existingItemIndex = userCart.findIndex(
            (cartItem: CartItem) => cartItem.productId === productId
        );

        if (existingItemIndex > -1) {
            // Remove item from cart
            userCart.splice(existingItemIndex, 1);
            return { 
                success: true, 
                message: 'Product removed from cart',
                cart: userCart 
            };
        }
        
        return { success: false, message: 'Product not found in cart' };
    }


}
