import { cn } from '../../../app/utils/cn';

type LogoProps = {
  className?: string;
}
export function Logo({ className }: LogoProps) {
  return (
    <div
      className={cn('flex gap-2', className)}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M18.4373 7.58594H9.38592C7.19686 7.58594 5.82397 9.13611 5.82397 11.3306V17.2513C5.82397 19.4458 7.18929 20.9959 9.38592 20.9959H18.4362C20.6339 20.9959 22.0003 19.4458 22.0003 17.2513V11.3306C22.0003 9.13611 20.6339 7.58594 18.4373 7.58594Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.37183 12.0488H18.447" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.0852 7.58365L16.4994 4.94056C15.3632 3.06933 13.3979 2.43801 11.5116 3.57524L3.76284 8.23874C1.88403 9.36733 1.50568 11.4029 2.63426 13.2893L5.69569 18.3549C5.83839 18.6003 5.99622 18.8208 6.17675 19.0186V19.0262" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <span className="text-gray-50">finance app</span>
    </div>
  );
}
