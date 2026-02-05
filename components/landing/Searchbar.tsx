import { Search } from 'lucide-react'
import React from 'react'
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "./dialog"
// import { Button } from './button'
// import { Field, FieldGroup } from './field'
// import { Label } from './label'
// import { Input } from './input'
const Searchbar = () => {
  return (
    <div>
       <Search className='w-5 h-5 hover:text-shop_light_green hoverEffect cursor-pointer' />
{/* 
      <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="ghost"  className='w-5 h-5 hover:text-shop_light_green hoverEffect cursor-pointer' >
            <Search/>
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog> */}
    </div>
  )
}

export default Searchbar
