import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, GraduationCap, DollarSign, Clock, Target } from 'lucide-react';
import { UserInputs } from '@/pages/CareerPathBuilder';

interface FormField {
  id: number;
  field_name: string;
  field_label: string;
  field_type: 'select' | 'multi-select';
  options: Array<string | { label: string; value: string }>;
  icon: string | null;
  is_required: boolean;
  display_order: number;
}

interface UserInputPanelProps {
  userInputs: UserInputs;
  onInputChange: (inputs: UserInputs) => void;
}

const iconMap = {
  GraduationCap: <GraduationCap className="w-4 h-4 text-cyan-400" />,
  DollarSign: <DollarSign className="w-4 h-4 text-cyan-400" />,
  Clock: <Clock className="w-4 h-4 text-cyan-400" />,
};

export function UserInputPanel({ userInputs, onInputChange }: UserInputPanelProps) {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch form fields from the API
    const fetchFormFields = async () => {
      try {
        const response = await fetch('http://localhost/Futuremap-backend/api_form_fields.php');
        const data: FormField[] = await response.json();
        setFormFields(data.sort((a, b) => a.display_order - b.display_order));
      } catch (error) {
        console.error('Error fetching form fields:', error);
        setError('Failed to load form fields');
      }
    };
    fetchFormFields();
  }, []);

  const handleSelectChange = (fieldName: string, value: string) => {
    onInputChange({ ...userInputs, [fieldName]: value });
  };

  const handleInterestToggle = (fieldName: string, interest: string) => {
    const newInterests = (userInputs[fieldName] as string[] || []).includes(interest)
      ? (userInputs[fieldName] as string[]).filter(i => i !== interest)
      : [...(userInputs[fieldName] as string[] || []), interest];
    onInputChange({ ...userInputs, [fieldName]: newInterests });
  };

  const removeInterest = (fieldName: string, interest: string) => {
    const newInterests = (userInputs[fieldName] as string[] || []).filter(i => i !== interest);
    onInputChange({ ...userInputs, [fieldName]: newInterests });
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost/Futuremap-backend/save_profile.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(userInputs),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(result.message);
      } else {
        setError(result.message || 'Failed to save profile');
      }
    } catch (err) {
      setError('Unable to connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel h-full p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center space-x-2 mb-6">
        <Target className="w-5 h-5 text-cyan-400" />
        <h2 className="text-xl font-futuristic font-bold text-white">
          Your Profile
        </h2>
      </div>

      {error && (
        <p className="text-red-400 font-cyber text-sm text-center">{error}</p>
      )}
      {success && (
        <p className="text-green-400 font-cyber text-sm text-center">{success}</p>
      )}

      {formFields.map((field) => (
        <div key={field.id} className="space-y-3">
          <div className="flex items-center space-x-2">
            {field.icon && iconMap[field.icon as keyof typeof iconMap]}
            <Label className="text-gray-300 font-cyber">{field.field_label}</Label>
          </div>

          {field.field_type === 'select' && (
            <Select
              value={userInputs[field.field_name] as string || ''}
              onValueChange={(value) => handleSelectChange(field.field_name, value)}
            >
              <SelectTrigger className="glass-panel border-cyan-400/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-panel border-cyan-400/30 bg-gray-900/95">
                {field.options.map((option) => (
                  <SelectItem
                    key={typeof option === 'string' ? option : option.value}
                    value={typeof option === 'string' ? option : option.value}
                  >
                    {typeof option === 'string' ? option : option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {field.field_type === 'multi-select' && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {(userInputs[field.field_name] as string[] || []).map((interest) => (
                  <Badge
                    key={interest}
                    className="bg-cyan-400/20 text-cyan-400 border-cyan-400/30 font-cyber"
                  >
                    {interest}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => removeInterest(field.field_name, interest)}
                    />
                  </Badge>
                ))}
              </div>
              <Select onValueChange={(value) => handleInterestToggle(field.field_name, value)}>
                <SelectTrigger className="glass-panel border-cyan-400/30 text-white">
                  <SelectValue placeholder={`Add ${field.field_label.toLowerCase()}...`} />
                </SelectTrigger>
                <SelectContent className="glass-panel border-cyan-400/30 bg-gray-900/95">
                  {field.options
                    .filter((option) => !(userInputs[field.field_name] as string[] || []).includes(option as string))
                    .map((option) => (
                      <SelectItem key={option as string} value={option as string}>
                        {option as string}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      ))}

      <Button
        onClick={handleSave}
        className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-futuristic"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Saving...
          </div>
        ) : (
          'Save Profile'
        )}
      </Button>
    </div>
  );
}