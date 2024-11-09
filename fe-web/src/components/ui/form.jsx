import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

const FormFieldContext = React.createContext({})

const FormField = (
  {
    ...props
  }
) => {
  return (
    (<FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>)
  );
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

const FormItemContext = React.createContext({})

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    (<FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>)
  );
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    (<Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props} />)
  );
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    (<Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props} />)
  );
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    (<p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props} />)
  );
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    (<p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}>
      {body}
    </p>)
  );
})

FormMessage.displayName = "FormMessage"

const FormSelect = ({ options, ...props }) => {
  const { formItemId, error } = useFormField();

  return (
    <select
      id={formItemId}
      {...props}
      className={cn(
        "w-full px-3 py-2 rounded-md border border-gray-600 h-[40px]",
        "text-gray-900 bg-white",
        error ? "border-destructive" : "border-gray-600",
        "focus:outline-none focus:ring-2 focus:ring-black focus:border-gray-600",
        "hover:border-gray-800 transition-all hover:cursor-pointer",
        "disabled:bg-gray-100 disabled:cursor-not-allowed"
      )}
    >
      <option value="">Chọn một mục</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
FormSelect.displayName = "FormSelect"

const FormUpload = ({ ...props }) => {
  const { formItemId, error } = useFormField();
  const [fileName, setFileName] = React.useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setFileName(file.name);
    props.onChange(event);
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        id={formItemId}
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor={formItemId}
        className={cn(
          "block w-full px-3 py-2 rounded-md border cursor-pointer",
          "text-gray-900 bg-white",
          error ? "border-destructive" : "border-gray-600",
          "focus:outline-none focus:ring-2 focus:ring-black focus:border-gray-600",
          "hover:border-gray-800 transition-all",
          "disabled:bg-gray-100 disabled:cursor-not-allowed"
        )}
      >
        Chọn tệp
      </label>
    </div>
  );
};
FormUpload.displayName = "FormUpload"


export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormSelect,
  FormUpload,
}
