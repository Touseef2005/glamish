'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn-ui/card"
import { Input } from "@/components/shadcn-ui/input"
import { Label } from "@/components/shadcn-ui/label"
import { Textarea } from "@/components/shadcn-ui/textarea"
import { MapPin } from "lucide-react"

export default function DeliveryDetails({ formData = {}, onFormChange, errors = {} }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Details
                </CardTitle>
                <CardDescription>Enter your information for delivery</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName || ""}
                            onChange={onFormChange}
                            placeholder="Enter your first name"
                            className={errors.firstName ? 'border-red-500' : ''}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName || ""}
                            onChange={onFormChange}
                            placeholder="Enter your last name"
                            className={errors.lastName ? 'border-red-500' : ''}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={onFormChange}
                        placeholder="Enter your email"
                        className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phone"
                        name="phone"
                        value={formData.phone || ""}
                        onChange={onFormChange}
                        placeholder="Enter your phone number"
                        className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="address">Complete Address</Label>
                    <Textarea
                        id="address"
                        name="address"
                        value={formData.address || ""}
                        onChange={onFormChange}
                        placeholder="Enter your full address"
                        className={`${errors.address ? 'border-red-500' : ''} min-h-[100px] border`}
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            name="city"
                            value={formData.city || ""}
                            onChange={onFormChange}
                            placeholder="Enter your city"
                            className={errors.city ? 'border-red-500' : ''}
                        />
                        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode || ""}
                            onChange={onFormChange}
                            placeholder="Enter postal code"
                            className={errors.postalCode ? 'border-red-500' : ''}
                        />
                        {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
